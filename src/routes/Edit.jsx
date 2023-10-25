import { useState } from "react";

import SectionHeadingForms from "../components/SectionHeadingForms";

import { Form, useNavigate, redirect } from "react-router-dom";

import { getData, updateData, loadData, addData, deleteData } from "../utils/functions";

import { poupanças, recursos, contas, despesas, parcelas, creditos } from "../utils/texts";

import Cancel from "../assets/cancel.svg";
import Confirm from "../assets/confirm.svg";
import Delete from "../assets/delete.svg";

import "../../public/Main.css";

const today = new Date();
const month = today.getMonth();

let formData;
let showNameWarning = false;
let showValueWarning = false;
// Usado em 'contas'
let showExpirationWarning = false;
// Usado em 'despesas':
let showDateWarning = false;
let showPaymentMethodWarning = false;
let showCategoryWarning = false;
// Usado em 'parcelas':
let showLastWarning = false;
let showCreditCardWarning = false;

let r = '/recursos/';
let p = '/poupan%C3%A7as/';
let c = '/contas/';
let d = '/despesas/';
let par = '/parcelas/';
let cred = '/creditos/';

let id = 0;
let redirectTo = '';
let locatioN = '';
let useObject = '';

// Usado em '/parcelas':
let loadCredits = '';
let loadResources = '';
let creditValue = 0;
let creditId = 0;
let originalPaymentMethodValue = 0;

// Usado em '/despesas':
let resourceId = 0;
let useR = false;
let useC = false;
let originalPaymentIdLetter = '';
let originalPaymentMethodId = 0;
let originalLast = 0;



export function action() {
    // Usado em '/parcelas':
    if (window.location.pathname.includes(cred)) {
        const getCredit = getData(id, 'credits');
        updateData(id, { ...formData, value: getCredit.value, total: formData.value }, locatioN);
    }
    else if (window.location.pathname.includes(par)) {
        // Obtém os dados da opção de crédito selecionada:
        const getCredit = getData(creditId, 'credits');
        alert(getCredit.name)
        // Obtém os dados da opção de crédito original, na hipótese de o parcelamento estar sendo transferido de uma fonte de crédito para outra na edição:
        const getOriginalCredit = getData(originalPaymentMethodId, 'credits');
        // Obtém os dados da fatura da opção de crédito selecionada:
        const getNextInvoice = getData(creditId, 'nextInvoices');
        // Obtém os dados da fatura da opção de crédito original, na hipótese de o parcelamento estar sendo transferido de uma fonte de crédito para outra na edição:
        const getOriginalInvoice = getData(originalPaymentMethodId, 'nextInvoices');
        // Caso o parcelamento esteja sendo transferido de uma fonte de crédito para outra na edição:
        if (creditId !== 0 && creditId !== originalPaymentMethodId) {
            // Caso não haja fatura relacionada à opção de crédito selecionada:
            if (getNextInvoice.name === undefined) {
                // Cria fatura para a opção de crédito selecionada:
                addData({ name: `Fatura ${getCredit.name}`, value: formData.value, expenses: 0, installments: formData.value, id: creditId, creditCardId: creditId, fatura: true, expiration: `${getCredit.expiration}/${month + 2}` }, 'nextInvoices');
                // Altera a fatura da opção de crédito original (substituída), para que o valor tomado pelo parcelamento em questão seja deduzido da mesma:
                updateData(originalPaymentMethodId, { ...getOriginalInvoice, value: getOriginalInvoice.value - originalPaymentMethodValue, installments: getOriginalInvoice.installments - originalPaymentMethodValue }, 'nextInvoices');
                // Deleta a fatura da opção de crédito original (substituída), caso seu valor tenha sido zerado pela dedução acima:
                if (getData(originalPaymentMethodId, 'nextInvoices').value === 0) {
                    deleteData(originalPaymentMethodId, 'nextInvoices');
                }
                // Atualiza o valor da nova opção de crédito, subtraindo o valor tomado pelo parcelamento em questão:
                updateData(creditId, { ...getCredit, value: getCredit.value - (formData.value * formData.last) }, 'credits');
                // Atualiza o valor da opção de crédito original (substituída), devolvendo o valor tomado pelo parcelamento em questão:
                updateData(originalPaymentMethodId, { ...getOriginalCredit, value: getOriginalCredit.value + (originalPaymentMethodValue * originalLast) }, 'credits');
                // // Atualiza os dados do parcelamento questão:
                // updateData(id, { ...formData, creditCardId: creditId, creditCardName: getCredit.name, creditCardIdExpiration: getCredit.expiration }, locatioN);
                // Caso haja fatura relacionada à opção de crédito selecionada:
            } else if (getNextInvoice.name !== undefined) {
                alert('This2')
                // Altera a fatura da opção de crédito original (substituída), para que o valor tomado pelo parcelamento em questão seja deduzido da mesma:
                updateData(originalPaymentMethodId, { ...getOriginalInvoice, value: getOriginalInvoice.value - originalPaymentMethodValue, installments: getOriginalInvoice.installments - originalPaymentMethodValue }, 'nextInvoices');
                // Deleta a fatura da opção de crédito original (substituída), caso seu valor tenha sido zerado pela dedução acima:
                if (getData(originalPaymentMethodId, 'nextInvoices').value === 0) {
                    deleteData(originalPaymentMethodId, 'nextInvoices');
                }
                // Atualiza o valor da opção de crédito original (substituída), devolvendo o valor tomado pelo parcelamento em questão:
                updateData(originalPaymentMethodId, { ...getOriginalCredit, value: getOriginalCredit.value + (originalPaymentMethodValue * originalLast) }, 'credits');
                // Atualiza o valor da nova opção de crédito, subtraindo o valor tomado pelo parcelamento em questão:
                updateData(creditId, { ...getCredit, value: getCredit.value - (formData.value * formData.last) }, 'credits');
                // Atualiza o valor da fatura da nova opção de crédito:
                updateData(creditId, { ...getNextInvoice, value: getNextInvoice.value + formData.value, installments: getNextInvoice.installments + formData.value }, 'nextInvoices');
            }
            // Atualiza os dados do parcelamento questão:
            updateData(id, { ...formData, creditCardId: creditId, creditCardName: getCredit.name, creditCardIdExpiration: getCredit.expiration }, locatioN);
        }
        // Caso o parcelamento não esteja sendo transferido de uma fonte de crédito para outra na edição, apenas o valor está sendo alterado:
        else if (creditId === 0 || creditId === originalPaymentMethodId) {
            alert('that')
            // Caso o valor original da parcela seja menor que o valor para o qual ela foi alterada:
            if (formData.value > originalPaymentMethodValue) {
                // Atualiza o valor da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getCredit, value: getCredit.value - (formData.value * formData.last) + (originalPaymentMethodValue * originalLast) }, 'credits');
                // Atualiza o valor da fatura da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getNextInvoice, value: getNextInvoice.value + formData.value - originalPaymentMethodValue }, 'nextInvoices');
            }
            // Caso o valor original da parcela seja maior que o valor para o qual ela foi alterada:
            else if (formData.value < originalPaymentMethodValue) {
                // Atualiza o valor da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getCredit, value: getCredit.value - (formData.value * formData.last) + (originalPaymentMethodValue * originalLast) }, 'credits');
                // Atualiza o valor da fatura da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getNextInvoice, value: getNextInvoice.value - formData.value + originalPaymentMethodValue }, 'nextInvoices');

            }
            // Atualiza os dados do parcelamento questão:
            updateData(id, formData, locatioN);
        }
    }
    // Usado em '/despesas':
    if (window.location.pathname.includes(d)) {
        // Se a despesa em questão foi atribuída a um recurso e agora para outro na edição:
        if (originalPaymentIdLetter === 'R' && useR === true && resourceId !== originalPaymentMethodId) {
            // Obtém os dados do novo recurso selecionado:
            const getResource = getData(resourceId, 'resources');
            // Obtém os dados do recurso original (substituído):
            const getOriginalResource = getData(originalPaymentMethodId, 'resources');
            // Atualiza o valor do novo recurso selecionado, subtraindo o valor tomado pela despesa em questão:
            updateData(resourceId, { ...getResource, value: getResource.value - formData.value }, 'resources');
            // Atualiza o valor do recurso original (substituído), devolvendo o valor tomado pela despesa em questão:
            updateData(getOriginalResource.id, { ...getOriginalResource, value: getOriginalResource.value + originalPaymentMethodValue }, 'resources');
            // Salva a despesa editada:
            updateData(formData.id, { ...formData, paymentMethodName: getResource.name }, locatioN);
        }
        // Se a despesa em questão foi atribuída a um recurso e agora para um crédito na edição:
        else if (originalPaymentIdLetter === 'R' && useC === true) {
            // Obtém os dados do recurso original (substituído):
            const getOriginalResource = getData(originalPaymentMethodId, 'resources');
            // Obtém os dados da opção de crédito selecionada:
            const getCredit = getData(creditId, 'credits');
            // Atualiza o valor do recurso original (substituído), devolvendo o valor tomado pela despesa em questão:
            updateData(getOriginalResource.id, { ...getOriginalResource, value: getOriginalResource.value + originalPaymentMethodValue }, 'resources');
            // Atualiza o valor da opção de crédito selecionada, subtraindo o valor da despesa atual:
            updateData(creditId, { ...getCredit, value: getCredit.value - formData.value }, 'credits');
            // Checa a existência de fatura atribuída à opção de crédito selecionada:
            const getNextInvoice = getData(creditId, 'nextInvoices');
            // Cria uma fatura relacionada à opção de crédito selecionada, caso não haja uma:
            if (getNextInvoice.name === undefined) {
                addData({ name: `Fatura ${getCredit.name}`, value: formData.value, expenses: formData.value, installments: 0, id: creditId, creditCardId: creditId, fatura: true, expiration: `${getCredit.expiration}/${month + 2}` }, 'nextInvoices');
            }
            // Atualiza a fatura relacionada à opção de crédito selecionada:
            else {
                updateData(creditId, { ...getNextInvoice, value: getNextInvoice.value + originalPaymentMethodValue, expenses: getNextInvoice.expenses + originalPaymentMethodValue }, 'nextInvoices');
            }
            // Salva a despesa editada:
            updateData(id, { ...formData, paymentMethodName: getCredit.name, paymentIdLetter: 'C' }, locatioN);
        } // Se a despesa em questão foi atribuída a uma opção de crédito e agora para outra na edição:
        else if (originalPaymentIdLetter === 'C' && useC === true && creditId !== originalPaymentMethodId) {
            // Obtém os dados da opção de crédito selecionada:
            const getCredit = getData(creditId, 'credits');
            // Obtém os dados da opção de crédito original (substituída):
            const getOriginalCredit = getData(originalPaymentMethodId, 'credits');
            // Obtém os dados da fatura da opção de crédito selecionada:
            const getNextInvoice = getData(creditId, 'nextInvoices');
            // Obtém os dados da fatura da opção de crédito original:
            const getOriginalInvoice = getData(originalPaymentMethodId, 'nextInvoices');
            // Caso não haja fatura relacionada à nova opção de crédito selecionada:
            if (getNextInvoice.name === undefined) {
                // Cria fatura para a opção de crédito selecionada:
                addData({ name: `Fatura ${getCredit.name}`, value: formData.value, expenses: formData.value, installments: 0, id: creditId, creditCardId: creditId, fatura: true, expiration: `${getCredit.expiration}/${month + 2}` }, 'nextInvoices');
                // Altera a fatura da opção de crédito original (substituída), para que o valor tomado pela despesa em questão seja deduzido da mesma:
                updateData(originalPaymentMethodId, { ...getOriginalInvoice, value: getOriginalInvoice.value - originalPaymentMethodValue, expenses: getOriginalInvoice.expenses - originalPaymentMethodValue }, 'nextInvoices');
                // Deleta a fatura da opção de crédito original (substituída), caso seu valor tenha sido zerado pela dedução acima:
                if (getData(originalPaymentMethodId, 'nextInvoices').value === 0) {
                    deleteData(originalPaymentMethodId, 'nextInvoices');
                }
                // Atualiza o valor da nova opção de crédito, subtraindo o valor tomado pela despesa em questão:
                updateData(creditId, { ...getCredit, value: getCredit.value - formData.value }, 'credits');
                // Atualiza o valor da opção de crédito original (substituída), devolvendo o valor tomado pela despesa em questão:
                updateData(getOriginalCredit.id, { ...getOriginalCredit, value: getOriginalCredit.value + originalPaymentMethodValue }, 'credits');
                // Salva a despesa editada:
                updateData(id, { ...formData, paymentMethodName: getCredit.name }, locatioN);
            } else if (getNextInvoice.name !== undefined) {
                // Atualiza a fatura existente da opção de crédito selecionada:
                updateData(creditId, { ...getNextInvoice, value: getNextInvoice.value + formData.value, expenses: getNextInvoice.expenses + formData.value }, 'nextInvoices');
                // Altera a fatura da opção de crédito original (substituída), para que o valor tomado pela despesa em questão seja deduzido da mesma:
                updateData(originalPaymentMethodId, { ...getOriginalInvoice, value: getOriginalInvoice.value - originalPaymentMethodValue, expenses: getOriginalInvoice.expenses - originalPaymentMethodValue }, 'nextInvoices');
                // Deleta a fatura da opção de crédito original (substituída), caso seu valor tenha sido zerado pela dedução acima:
                if (getData(originalPaymentMethodId, 'nextInvoices').value === 0) {
                    deleteData(originalPaymentMethodId, 'nextInvoices');
                }
                // Atualiza o valor da nova opção de crédito, subtraindo o valor tomado pela despesa em questão:
                updateData(creditId, { ...getCredit, value: getCredit.value - formData.value }, 'credits');
                // Atualiza o valor da opção de crédito original (substituída), devolvendo o valor tomado pela despesa em questão:
                updateData(getOriginalCredit.id, { ...getOriginalCredit, value: getOriginalCredit.value + originalPaymentMethodValue }, 'credits');
                // Salva a despesa editada:
                updateData(id, { ...formData, paymentMethodName: getCredit.name }, locatioN);
            }
        }
        // Se a despesa em questão foi atribuída a um recurso e agora para uma opção de crédito na edição:
        else if (originalPaymentIdLetter === 'C' && useR === true) {
            // Obtém os dados da opção de crédito original (substituída):
            const getOriginalCredit = getData(originalPaymentMethodId, 'credits');
            // Obtém os dados do recurso selecionado:
            const getResource = getData(resourceId, 'resources');
            // Obtém os dados da fatura da opção de crédito original:
            const getOriginalInvoice = getData(originalPaymentMethodId, 'nextInvoices');
            // Atualiza o valor da opção de crédito original (substituída), devolvendo o valor tomado pela despesa em questão:
            updateData(getOriginalCredit.id, { ...getOriginalCredit, value: getOriginalCredit.value + originalPaymentMethodValue }, 'credits');
            // Atualiza o valor do recurso selecionado, subtraindo o valor da despesa atual:
            updateData(resourceId, { ...getResource, value: getResource.value - formData.value }, 'resources');
            // Atualiza a fatura relacionada à opção de crédito original (substituída):
            updateData(getOriginalCredit.id, { ...getOriginalInvoice, value: getOriginalInvoice.value - originalPaymentMethodValue, expenses: getOriginalInvoice.expenses + originalPaymentMethodValue }, 'nextInvoices');
            // Deleta a fatura da opção de crédito original (substituída), caso seu valor tenha sido zerado pela dedução acima:
            if (getData(originalPaymentMethodId, 'nextInvoices').value === 0) {
                deleteData(originalPaymentMethodId, 'nextInvoices');
            }
            // Salva a despesa editada:
            updateData(id, { ...formData, paymentMethodName: getResource.name, paymentIdLetter: 'R' }, locatioN);
        }
        // Se a despesa em questão foi atribuída a um recurso e apenas o valor da mesma será alterado na edição:
        else if (originalPaymentIdLetter === 'R') {
            // Obtém os dados do recurso utilizado:
            const getResource = getData(originalPaymentMethodId, 'resources');
            // Atualiza o valor do recurso utilizado, subtraindo o valor tomado pela despesa em questão:
            updateData(originalPaymentMethodId, { ...getResource, value: getResource.value - formData.value + originalPaymentMethodValue }, 'resources');
            // Salva a despesa editada:
            updateData(id, formData, locatioN);
        }
        // Se a despesa em questão foi atribuída a um recurso e apenas o valor da mesma será alterado na edição:
        else if (originalPaymentIdLetter === 'C') {
            // Obtém os dados da opção de crédito utilizada:
            const getCredit = getData(originalPaymentMethodId, 'credits');
            // Obtém os dados da fatura da opção de crédito utilizada:
            const getNextInvoice = getData(originalPaymentMethodId, 'nextInvoices');
            // Caso o valor original da despesa seja menor que o valor para o qual ela foi alterada:
            if (formData.value > originalPaymentMethodValue) {
                // Atualiza o valor da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getCredit, value: getCredit.value - formData.value + originalPaymentMethodValue }, 'credits');
                // Atualiza o valor da fatura da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getNextInvoice, value: getNextInvoice.value + formData.value - originalPaymentMethodValue }, 'nextInvoices');
            }
            // Caso o valor original da despesa seja maior que o valor para o qual ela foi alterada:
            else if (formData.value < originalPaymentMethodValue) {
                // Atualiza o valor da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getCredit, value: getCredit.value - formData.value + originalPaymentMethodValue }, 'credits');
                // Atualiza o valor da fatura da opção de crédito utilizada, subtraindo o valor tomado pela despesa em questão:
                updateData(originalPaymentMethodId, { ...getNextInvoice, value: getNextInvoice.value - formData.value + originalPaymentMethodValue }, 'nextInvoices');
            }
            // Salva a despesa editada:
            updateData(id, formData, locatioN);
        }
    } else if (!window.location.pathname.includes(par) && !window.location.pathname.includes(d) && !window.location.pathname.includes(cred)) {
        updateData(id, formData, locatioN);
    }
    showNameWarning = false;
    showValueWarning = false;
    // Usado em 'contas':
    showExpirationWarning = false;
    // Usado em 'despesas':
    showDateWarning = false;
    showPaymentMethodWarning = false;
    showCategoryWarning = false;
    // Usado em 'parcelas':
    showLastWarning = false;
    showCreditCardWarning = false;
    return redirect(redirectTo);
}

export default function Edit() {
    if (window.location.pathname.includes(r)) {
        id = window.location.pathname.slice(r.length, -7);
        locatioN = 'resources';
        useObject = recursos;
        redirectTo = '/recursos';
    } else if (window.location.pathname.includes(p)) {
        id = window.location.pathname.slice(p.length, -7);
        locatioN = 'savings';
        useObject = poupanças;
        redirectTo = '/poupanças';
    } else if (window.location.pathname.includes(c)) {
        id = window.location.pathname.slice(c.length, -7);
        locatioN = 'bills';
        useObject = contas;
        redirectTo = '/contas';
    } else if (window.location.pathname.includes(d)) {
        id = window.location.pathname.slice(d.length, -7);
        locatioN = 'expenses';
        useObject = despesas;
        redirectTo = '/despesas';
    } else if (window.location.pathname.includes(par)) {
        id = window.location.pathname.slice(par.length, -7);
        locatioN = 'installments';
        useObject = parcelas;
        redirectTo = '/parcelas';
    } else if (window.location.pathname.includes(cred)) {
        id = window.location.pathname.slice(cred.length, -7);
        locatioN = 'credits';
        useObject = creditos;
        redirectTo = '/creditos';
    }
    const navigate = useNavigate();
    const [editData, setEditData] = useState(getData(id, locatioN));
    const [deletion, setDeletion] = useState(false);
    const getOriginalCreditValue = getData(id, locatioN);
    originalPaymentMethodValue = getOriginalCreditValue.value;
    if (locatioN === 'expenses') {
        const getOriginalPaymentMethod = getData(id, locatioN);
        originalPaymentIdLetter = getOriginalPaymentMethod.paymentIdLetter;
        originalPaymentMethodId = getOriginalPaymentMethod.paymentMethodId;
    }
    if (locatioN === 'installments') {
        const getOriginalPaymentMethod = getData(id, locatioN);
        originalPaymentIdLetter = getOriginalPaymentMethod.paymentIdLetter;
        originalPaymentMethodId = getOriginalPaymentMethod.creditCardId;
        originalLast = getOriginalPaymentMethod.last;
    }
    const handleChange = (evt) => {
        let newValue = evt.target.value;
        const changedField = evt.target.name;
        if (changedField === 'name') {
            showNameWarning = true;
        } else if (changedField === 'value') {
            showValueWarning = true;
            newValue = Number(evt.target.value);
        }
        // Usado em 'contas':
        else if (changedField === 'expiration') {
            showExpirationWarning = true;
            const removeYear = evt.target.value.slice(5);
            const takeDay = removeYear.slice(3);
            const takeMonth = removeYear.slice(0, 2);
            newValue = `${takeDay}/${takeMonth}`
        }
        // Usado em 'despesas':
        else if (changedField === 'date') {
            showDateWarning = true;
            const removeYear = evt.target.value.slice(5);
            const takeDay = removeYear.slice(3);
            const takeMonth = removeYear.slice(0, 2);
            newValue = `${takeDay}/${takeMonth}`;
        } else if (changedField === 'paymentMethod') {
            showPaymentMethodWarning = true;
        } else if (changedField === 'category') {
            showCategoryWarning = true;
        } else if (changedField === 'paymentMethodId') {
            showPaymentMethodWarning = true;
            let event = evt.target.value;
            if (event[0] === 'R') {
                useR = true;
                useC = false;
                resourceId = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
                let isolateValueA = event.indexOf('$');
                let isolateValueB = event.indexOf('(');
                // resourceValue = Number(event.slice(isolateValueA + 1, isolateValueB));
                newValue = resourceId;
            } else if (event[0] === 'C') {
                useC = true;
                useR = false;
                creditId = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
                let isolateValueA = event.indexOf('$');
                let isolateValueB = event.indexOf('(');
                creditValue = Number(event.slice(isolateValueA + 1, isolateValueB));
                newValue = creditId;
            }
        } else if (changedField === 'category') {
            showCategoryWarning = true;
        }
        // Usado em 'parcelas':
        else if (changedField === 'last') {
            newValue = Number(evt.target.value);
            showLastWarning = true;
        } else if (changedField === 'creditCardId') {
            showCreditCardWarning = true;
            let event = evt.target.value;
            // let getName = event.slice(0, event.indexOf('/'));
            creditId = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
            let isolateValueA = event.indexOf('$');
            let isolateValueB = event.indexOf('(');
            creditValue = Number(event.slice(isolateValueA + 1, isolateValueB));
            newValue = creditId;
        }
        setEditData(oldData => {
            oldData[changedField] = newValue;
            return { ...oldData };
        });
    }
    // Iguala 'formData' aos dados usados no formulário - 'formData' será parametrizado em 'action':
    const changeFormData = () => {
        formData = editData;
    }
    const toggleWarnings = () => {
        showNameWarning = !showNameWarning;
        showValueWarning = !showValueWarning;
        // Usado em 'contas'
        showExpirationWarning = !showExpirationWarning;
        // Usado em 'despesas':
        showDateWarning = !showDateWarning;
        showCategoryWarning = !showCategoryWarning;
        showPaymentMethodWarning = !showPaymentMethodWarning;
        // Usado em 'parcelas':
        showLastWarning = !showLastWarning;
        showCreditCardWarning = !showCreditCardWarning;
    }
    const title = [...useObject.title];
    title.pop();
    const prepTitle = title.toString().replaceAll(',', '');
    const useTitle = prepTitle[0].toLowerCase() + prepTitle.slice(1);
    const manageDeletion = () => {
        setDeletion(!deletion)
    }
    if (locatioN === 'installments') {
        loadCredits = loadData('credits');
    }
    if (locatioN === 'expenses') {
        loadCredits = loadData('credits');
        loadResources = loadData('resources');
    }
    console.log(editData)
    return (
        <div className="Main">
            <SectionHeadingForms title={deletion ? `Deletar ${useTitle} abaixo?` : `Editar ${useTitle}`} text={deletion ? 'Essa ação não pode ser desfeita!' : useObject.textEdit} />
            <Form method="post" className="AppForm" action={deletion ? 'delete' : ''}>
                {/* Usado em '/recursos': */}
                {locatioN === 'resources' &&
                    <div key={editData.id} id={deletion ? "individualForDeletion" : ''}>
                        {deletion ?
                            <>
                                <span>{editData.name}</span>
                                <span>R$ {editData.value}</span>
                            </> :
                            <>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder={editData.name} />
                                <input type="number" name="value" id="value" min={0} onChange={handleChange} placeholder={`R$ ${editData.value}`} />
                            </>
                        }
                    </div>}
                {/* Usado em '/poupanças': */}
                {locatioN === 'savings' &&
                    <div key={editData.id} id={deletion ? "individualForDeletion" : ''}>
                        {deletion ?
                            <>
                                <span>{editData.name}</span>
                                <span>R$ {editData.value}</span>
                            </> :
                            <>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder={editData.name} />
                                <input type="number" name="value" id="value" min={0} onChange={handleChange} placeholder={`R$ ${editData.value}`} />
                            </>
                        }
                    </div>}
                {/* Usado em '/contas': */}
                {locatioN === 'bills' &&
                    <div key={editData.id} id={deletion ? "individualForDeletion" : ''}>
                        {deletion ?
                            <>
                                <span>{editData.name}</span>
                                <span>R$ {editData.value}</span>
                                <span>{editData.expiration}</span>
                            </> :
                            <>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder={editData.name} />
                                <input type="number" name="value" id="value" min={0} onChange={handleChange} placeholder={`R$ ${editData.value}`} />
                                <input type="date" name="expiration" id="expiration" onChange={handleChange} />
                            </>
                        }
                    </div>}
                {/* Usado em '/despesas': */}
                {locatioN === 'expenses' &&
                    <div key={editData.id} id={deletion ? "individualForDeletion" : ''}>
                        {deletion ?
                            <>
                                <span>{editData.name}</span>
                                <span>R$ {editData.value}</span>
                                <span>{editData.date}</span>
                                <span>({editData.paymentMethod})</span>
                                <span><i>{editData.category}</i></span>
                            </> :
                            <>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder={editData.name} />
                                <input type="number" name="value" id="value" min={0} onChange={handleChange} placeholder={`R$ ${editData.value}`} />
                                <input type="date" name="date" id="date" onChange={handleChange} />
                                <select onChange={handleChange} defaultValue={'Forma de pagamento'} name="paymentMethodId" id="paymentMethodId">
                                    <option disabled defaultValue>Forma de pagamento</option>
                                    {loadResources.filter(e => Number(e.value >= editData.value)).map(e => <option key={e.id} value={`R - ${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
                                    {loadCredits.filter(e => Number(e.value >= editData.value)).map(e => <option key={e.id} value={`C - ${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
                                </select>
                                <select onChange={handleChange} defaultValue={'Categoria'} name="category" id="category">
                                    <option disabled defaultValue>Categoria</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Alimentação">Alimentação</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Lazer">Lazer</option>
                                    <option value="Taxas/Impostos">Taxas/Impostos</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </>
                        }
                    </div>}
                {/* Usado em '/parcelas': */}
                {locatioN === 'installments' &&
                    <div key={editData.id} id={deletion ? "individualForDeletion" : ''}>
                        {deletion ?
                            <>
                                <span>{editData.name}</span>
                                <span>R$ {editData.value}</span>
                                <span style={{ width: '80px' }}>{editData.current}/{editData.last}</span>
                            </> :
                            <>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder={editData.name} />
                                <input type="number" name="value" id="value" min={0} step=".01" onChange={handleChange} placeholder={`Parcela: R$${editData.value}`} />
                                <input type="number" name="last" id="last" min={2} onChange={handleChange} placeholder={`${editData.last}X`} />
                                <select onChange={handleChange} defaultValue={'Cartão de crédito'} name="creditCardId" id="creditCardId">
                                    <option defaultValue>{editData.creditCardName}</option>
                                    {/* B */}
                                    {loadCredits.filter(e => Number(e.value) >= (editData.value * editData.last)).map(e => <option key={e.id} value={`${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
                                </select>
                            </>
                        }
                    </div>}
                {/* Usado em '/creditos': */}
                {locatioN === 'credits' &&
                    <div key={editData.id} id={deletion ? "individualForDeletion" : ''}>
                        {deletion ?
                            <>
                                <span>{editData.name}</span>
                                <span>R$ {editData.value}</span>
                                <span>{editData.taken}</span>
                                <span>{editData.total}</span>
                            </> :
                            <>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder={editData.name} />
                                <input type="number" name="value" id="value" min={0} step=".01" onChange={handleChange} placeholder={`Limite total R$ ${editData.total}`} />
                                <input type="number" name="expiration" id="expiration" onChange={handleChange} min={1} max={28} maxLength="2" placeholder={`Venc. ${editData.expiration}`} />
                            </>
                        }
                    </div>}
                {showNameWarning && !editData.name ?
                    <div id="warning" style={{ color: 'red' }}>
                        {prepTitle} não pode ficar em branco!
                    </div>
                    : null}
                {showValueWarning && !editData.value ?
                    <div id="warning" style={{ color: 'red' }}>
                        {locatioN === 'credits' ? 'O limite disponível não pode ficar em branco!' : 'O valor não pode ficar em branco!'}
                    </div>
                    : null}
                {/* Usado em '/parcelas': */}
                {/* // Usado em 'parcelas': */}
                {showLastWarning && !editData.last ?
                    <div id="warning" style={{ color: 'red' }}>
                        O número de parcelas não pode ficarem branco!
                    </div>
                    : null}
                {showCreditCardWarning && !editData.creditCardId ?
                    <div id="warning" style={{ color: 'red' }}>
                        O cartão de crédito não pode ficarem branco!
                    </div>
                    : null}
                {creditValue < Number(editData.value * editData.last && creditValue !== 0) ?
                    <div id="warning" style={{ color: 'red' }}>
                        Você não possui mais limite disponível para um parcelamento neste valor!
                    </div>
                    : null}


                <span id="button-container">
                    {/* Usado em '/parcelas': */}
                    {locatioN === 'installments' && <>
                        {deletion === false &&
                            <>
                                {!editData.name || !editData.value || !editData.last || !editData.creditCardId || creditValue < (editData.value * editData.last) ?
                                    <button disabled onClick={toggleWarnings}><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                                <button id="cancel" type='button' onClick={() => {
                                    navigate(-1);
                                    toggleWarnings();
                                }}><img src={Cancel} /></button>
                                <button id="delete" onClick={manageDeletion} type='button'><img src={Delete} /></button>
                            </>}

                    </>}
                    {/* Usado em '/creditos': */}
                    {locatioN === 'credits' && <>
                        {deletion === false &&
                            <>
                                {!editData.name || !editData.value ?
                                    <button disabled onClick={toggleWarnings}><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                                <button id="cancel" type='button' onClick={() => {
                                    navigate(-1);
                                    toggleWarnings();
                                }}><img src={Cancel} /></button>
                                <button id="delete" onClick={manageDeletion} type='button'><img src={Delete} /></button>
                            </>}

                    </>}
                    {/* Usado para todos os demais: */}
                    {locatioN !== 'installments' && locatioN !== 'credits' ? <>
                        {deletion === false &&
                            <>
                                {!editData.name || !editData.value ?
                                    <button disabled onClick={toggleWarnings}><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                                <button id="cancel" type='button' onClick={() => {
                                    navigate(-1);
                                    toggleWarnings();
                                }}><img src={Cancel} /></button>
                                {!editData.fatura && <button id="delete" onClick={manageDeletion} type='button'><img src={Delete} /></button>}

                            </>}

                    </> : null}




                    {deletion === true &&
                        <>
                            <button id="confirm"><img src={Confirm} /></button>
                            <button id="cancel" type='button' onClick={() => {
                                manageDeletion();
                                toggleWarnings();
                            }}><img src={Cancel} /></button>
                        </>}
                    {/* <Link to={`/${useTitle}s/${editData.id}`}><button id="delete" type='button'><img src={Delete} /></button></Link> */}
                </span>
            </Form >
        </div >
    )
}



//  {/* // Usado em 'contas': */}
//  {showExpirationWarning && !editData.expiration ?
//     <div id="warning" style={{ color: 'red' }}>
//         A data de vencimento não pode ficarem branco!
//     </div>
//     : null}
// {/* // Usado em 'despesas': */}
// {showDateWarning && !editData.date ?
//     <div id="warning" style={{ color: 'red' }}>
//         A data não pode ficarem branco!
//     </div>
//     : null}
// {showPaymentMethodWarning && !editData.paymentMethod ?
//     <div id="warning" style={{ color: 'red' }}>
//         A forma de pagamento não pode ficarem branco!
//     </div>
//     : null}
// {showCategoryWarning && !editData.category ?
//     <div id="warning" style={{ color: 'red' }}>
//         A categoria não pode ficarem branco!
//     </div>
//     : null}