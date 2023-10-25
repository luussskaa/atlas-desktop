import { useState } from "react";

import SectionHeadingForms from "../components/SectionHeadingForms";

import { Form, redirect, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { poupanças, recursos, contas, despesas, parcelas, creditos } from "../utils/texts";

import { addData, loadData, getData, updateData, deleteData } from "../utils/functions";

import Cancel from "../assets/cancel.svg";
import Confirm from "../assets/confirm.svg";

import "../../public/AppForm.css"

const today = new Date();
const month = today.getMonth();

let formData;
let showNameWarning = false;
let showValueWarning = false;
// Usado em 'contas':
let showExpirationWarning = false;
// Usado em 'despesas':
let showDateWarning = false;
let showPaymentMethodWarning = false;
let showCategoryWarning = false;
// Usado em 'parcelas':
let showLastWarning = false;
let showCreditCardWarning = false;
// Usado em 'créditos':
let showTotalWarning = false;

let r = '/recursos/';
let p = '/poupan%C3%A7as/';
let c = '/contas/';
let d = '/despesas/';
let par = '/parcelas/';
let cred = '/creditos/';

let redirectTo = '';
let locatioN = '';
let useObject = '';

let loadCredits = '';
let loadResources = '';
let creditValue = 0;
let creditId = 0;
let resourceId = 0;
let resourceValue = 0;
let useR = false;
let useC = false;

let useThis = {};

export function action() {
    if (window.location.pathname.includes(cred)) {
        addData({ ...formData, total: formData.value }, locatioN);
    } else if (window.location.pathname.includes(par)) {
        const getCredit = getData(creditId, 'credits');
        // Criando a fatura de crédito do período seguinte:
        const getNextInvoice = getData(creditId, 'nextInvoices');
        if (getNextInvoice.name === undefined) {
            addData({ name: `Fatura ${getCredit.name}`, value: formData.value, expenses: 0, installments: formData.value, id: creditId, creditCardId: creditId, fatura: true, expiration: `${getCredit.expiration}/${month === 11 ? month - 11 : month + 2}` }, 'nextInvoices');
        } else {
            updateData(creditId, { ...getNextInvoice, value: getNextInvoice.value + formData.value, installments: getNextInvoice.installments + formData.value }, 'nextInvoices');
        }
        // Atualizando o limite de crédito disponível:
        updateData(creditId, { ...getCredit, value: getCredit.value - (formData.value * formData.last) }, 'credits');
        // Adicionando a parcela ao sistema:
        addData({ ...formData, creditCardName: getCredit.name, creditCardIdExpiration: getCredit.expiration }, locatioN);
    } else if (window.location.pathname.includes(d)) {
        if (useR === true) {
            const getResource = getData(resourceId, 'resources');
            updateData(resourceId, { ...getResource, value: getResource.value - formData.value }, 'resources');
            addData({ ...formData, paymentMethodName: getResource.name, paymentIdLetter: 'R' }, locatioN);
        } else if (useC === true) {
            const getCredit = getData(creditId, 'credits');
            const getNextInvoice = getData(creditId, 'nextInvoices');
            if (getNextInvoice.name === undefined) {
                addData({ name: `Fatura ${getCredit.name}`, value: formData.value, expenses: formData.value, installments: 0, id: creditId, creditCardId: creditId, fatura: true, expiration: `${getCredit.expiration}/${month === 11 ? month - 11 : month + 2}` }, 'nextInvoices');
            } else {
                updateData(creditId, { ...getNextInvoice, value: getNextInvoice.value + formData.value, expenses: getNextInvoice.expenses + formData.value }, 'nextInvoices');
            }
            updateData(creditId, { ...getCredit, value: getCredit.value - formData.value }, 'credits');
            addData({ ...formData, paymentMethodName: getCredit.name, paymentIdLetter: 'C' }, locatioN);
        }
    } else if (window.location.pathname.includes(p)) {
        const getResource = getData(resourceId, 'resources');
        updateData(resourceId, { ...getResource, value: getResource.value - formData.value }, 'resources');
        addData({ ...formData, resourceName: getResource.name, resourceId: resourceId }, locatioN);
    } else {
        addData(formData, locatioN)
    }
    showNameWarning = false;
    showValueWarning = false;
    // Usado em 'contas':
    showExpirationWarning = false;
    // Usado em 'despesas':
    showDateWarning = false;
    showCategoryWarning = false;
    showPaymentMethodWarning = false;
    useR = false;
    useC = false;
    // Usado em 'parcelas':
    showLastWarning = false;
    showCreditCardWarning = false;
    // Usado em 'créditos':
    showTotalWarning = false;
    return redirect(redirectTo);
}

export default function Create() {
    // As variáveis abaixo vão definir o tipo de recurso a ser criado:
    // 'Recursos' e 'Poupanças' usam os mesmos campos de formulário:
    const resources = { name: '', value: '', id: '' };
    const savings = { name: '', value: '', id: '', resourceName: '', resourceId: '' };
    const bills = { name: '', value: '', id: '', expiration: '' };
    const expenses = { name: '', value: '', id: '', date: '', paymentMethodName: '', paymentMethodId: '', paymentIdLetter: '', category: '' };
    const installments = { name: '', value: '', id: '', current: 1, last: '', creditCardId: '', creditCardName: '', creditCardIdExpiration: '' };
    const credits = { name: '', value: '', id: '', total: '', expiration: '' };
    if (window.location.pathname.includes(r)) {
        useObject = recursos;
        useThis = resources;
        redirectTo = '/recursos';
        locatioN = r.replaceAll('/', '');
    } else if (window.location.pathname.includes(p)) {
        useObject = poupanças;
        useThis = savings;
        redirectTo = '/poupanças';
        locatioN = p.replaceAll('/', '');
    } else if (window.location.pathname.includes(c)) {
        useObject = contas;
        useThis = bills;
        redirectTo = '/contas';
        locatioN = c.replaceAll('/', '');
    } else if (window.location.pathname.includes(d)) {
        useObject = despesas;
        useThis = expenses;
        redirectTo = '/despesas';
        locatioN = d.replaceAll('/', '');
    } else if (window.location.pathname.includes(par)) {
        useObject = parcelas;
        useThis = installments;
        redirectTo = '/parcelas';
        locatioN = par.replaceAll('/', '');
    } else if (window.location.pathname.includes(cred)) {
        useObject = creditos;
        useThis = credits;
        redirectTo = '/creditos';
        locatioN = cred.replaceAll('/', '');
    }
    const navigate = useNavigate();
    const [data, setData] = useState(useThis)
    const handleChange = (evt) => {
        let newValue = evt.target.value;
        const changedField = evt.target.name;
        if (changedField === 'name') {
            showNameWarning = true;
        } else if (changedField === 'value') {
            newValue = Number(evt.target.value);
            showValueWarning = true;
        }
        // Usado em '/poupanças':
        else if (changedField === 'resourceId') {
            showPaymentMethodWarning = true;
            let event = evt.target.value;
            resourceId = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
            newValue = resourceId;
        }
        // Usado em '/contas' e '/creditos':
        else if (changedField === 'expiration') {
            showExpirationWarning = true;
            if (useThis === bills) {
                const removeYear = evt.target.value.slice(5);
                let takeDay = removeYear.slice(3);
                // if (Number(takeDay) < 10) {
                //     takeDay = `0${removeYear.slice(3)};`
                // }
                const takeMonth = removeYear.slice(0, 2);
                newValue = `${takeDay}/${takeMonth}`
            } else {
                if (newValue < 10) {
                    newValue = Number(evt.target.value)
                    newValue = `0${(evt.target.value)}`;
                } else {
                    newValue = Number(evt.target.value);
                }
            }
        }
        // Usado em 'despesas':
        else if (changedField === 'date') {
            showDateWarning = true;
            const removeYear = evt.target.value.slice(5);
            const takeDay = removeYear.slice(3);
            const takeMonth = removeYear.slice(0, 2);
            newValue = `${takeDay}/${takeMonth}`;
        } else if (changedField === 'paymentMethodId') {
            showPaymentMethodWarning = true;
            let event = evt.target.value;
            if (event[0] === 'R') {
                useR = true;
                useC = false;
                resourceId = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
                let isolateValueA = event.indexOf('$');
                let isolateValueB = event.indexOf('(');
                resourceValue = Number(event.slice(isolateValueA + 1, isolateValueB));
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
        }
        else if (changedField === 'creditCardId') {
            showCreditCardWarning = true;
            let event = evt.target.value;
            // let getName = event.slice(0, event.indexOf('/'));
            creditId = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
            let isolateValueA = event.indexOf('$');
            let isolateValueB = event.indexOf('(');
            creditValue = Number(event.slice(isolateValueA + 1, isolateValueB));
            newValue = creditId;
        }
        // Usado em 'creditos':
        else if (changedField === 'taken') {
            showTotalWarning = true;
        }
        setData(oldData => {
            oldData[changedField] = newValue;
            return { ...oldData, id: uuid() };
        });
    }

    // Iguala 'formData' aos dados usados no formulário - 'formData' será parametrizado em 'action':
    const changeFormData = () => {
        formData = data;
    }
    // Para impedir que mensagens de erro sejam exibidas na próxima vez que o componente for carregado (pois não usam 'useState'), ao clicar no botão de cancelamento:
    const toggleWarnings = () => {
        showNameWarning = false;
        showValueWarning = false;
        // Usado em 'contas':
        showExpirationWarning = false;
        // Usado em 'despesas':
        showDateWarning = false;
        showCategoryWarning = false;
        showPaymentMethodWarning = false;
        // Usado em 'parcelas':
        showLastWarning = false;
        showCreditCardWarning = false;
        // Usado em 'créditos':
        showTotalWarning = false;
    }
    // A loja abaixo é um tratamento dado ao título de cada objeto (texts.js):
    const title = [...useObject.title];
    title.pop();
    const prepTitle = title.toString().replaceAll(',', ''); // Fornece o título no singular
    const useTitle = prepTitle[0].toLowerCase() + prepTitle.slice(1); // // Fornece o título no singular e com a primeira letra minúscula
    if (useThis === savings) {
        loadResources = loadData('resources');
    }
    if (useThis === installments) {
        loadCredits = loadData('credits');
    }
    if (useThis === expenses) {
        loadCredits = loadData('credits');
        loadResources = loadData('resources');
    }
    // Os 2 'if' statements acima precisam estar separados, caso contrário, A e B (abaixo) não funcionarão!
    return (
        <div className="Main">
            <SectionHeadingForms title={`Adicionar ${useTitle}`} text={useObject.textAdd} />
            <Form method="post" className="AppForm">
                {/* Os conjuntos lógicos abaixo definem quais os inputs serão usados em cada ulr: */}
                {/* Usado em '/recursos': */}
                {useThis === resources &&
                    <div>
                        <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                        <input type="number" name="value" id="value" placeholder="R$ 0,00" min={0} step=".01" onChange={handleChange} value={data.value} />
                    </div>}
                {/* Usado em '/poupanças': */}
                {useThis === savings &&
                    <div>
                        <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                        <input type="number" name="value" id="value" placeholder="R$ 0,00" min={0} step=".01" onChange={handleChange} value={data.value} />
                        <select onChange={handleChange} defaultValue={'Recursos'} name="resourceId" id="resourceId">
                            <option disabled defaultValue>Recursos</option>
                            {loadResources.filter(e => e.value >= data.value).map(e => <option key={e.id} value={`${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
                        </select>
                    </div>}
                {/* Usado em '/contas': */}
                {useThis === bills &&
                    <div>
                        <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                        <input type="number" name="value" id="value" placeholder="R$ 0,00" min={0} step=".01" onChange={handleChange} value={data.value} />
                        <input type="date" name="expiration" id="expiration" onChange={handleChange} />
                    </div>}
                {/* Usado em '/despesas': */}
                {useThis === expenses &&
                    <div>
                        <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                        <input type="number" name="value" id="value" placeholder="R$ 0,00" min={0} step=".01" onChange={handleChange} value={data.value} />
                        <input type="date" name="date" id="date" onChange={handleChange} />
                        <select onChange={handleChange} defaultValue={'Forma de pagamento'} name="paymentMethodId" id="paymentMethodId">
                            <option disabled defaultValue>Forma de pagamento</option>
                            {loadResources.filter(e => Number(e.value >= data.value)).map(e => <option key={e.id} value={`R - ${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
                            {/* A */}
                            {loadCredits.filter(e => Number(e.value >= data.value)).map(e => <option key={e.id} value={`C - ${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
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
                    </div>}
                {/* Usado em '/parcelas': */}
                {useThis === installments &&
                    <div>
                        <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                        <input type="number" name="value" id="value" placeholder="Valor" min={0} step=".01" onChange={handleChange} value={data.value} />
                        <input type="number" name="last" id="last" placeholder="Parcelas" min={2} onChange={handleChange} value={data.last} />
                        <select onChange={handleChange} defaultValue={'Cartão de crédito'} name="creditCardId" id="creditCardId">
                            <option disabled defaultValue>Cartão de crédito</option>
                            {/* B */}
                            {loadCredits.filter(e => Number(e.value) >= (data.value * data.last)).map(e => <option key={e.id} value={`${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>)}
                        </select>
                    </div>}
                {/* Usado em '/creditos': */}
                {useThis === credits &&
                    <div>
                        <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                        <input type="number" name="value" id="value" placeholder="Limite total" min={0} step=".01" onChange={handleChange} value={data.value} />
                        <input type="number" name="expiration" id="expiration" onChange={handleChange} min={1} max={28} maxLength="2" placeholder="Vencimento" value={data.expiration} />
                    </div>}


                {/* Os conjuntos lógicos abaixo definem os critérios de exibição de mensagens de erro sinalizando o não preenchimento de dados vitais: */}
                {showNameWarning && !data.name ?
                    <div id="warning" style={{ color: 'red' }}>
                        {prepTitle} não pode ficar em branco!
                    </div>
                    : null}
                {showValueWarning && !data.value ?
                    <div id="warning" style={{ color: 'red' }}>
                        {useThis === credits ? 'O limite disponível não pode ficar em branco!' : 'O valor não pode ficar em branco!'}
                    </div>
                    : null}
                {/* // Usado em 'contas': */}
                {showExpirationWarning && !data.expiration ?
                    <div id="warning" style={{ color: 'red' }}>
                        A data de vencimento não pode ficarem branco!
                    </div>
                    : null}
                {/* // Usado em 'despesas': */}
                {showDateWarning && !data.date ?
                    <div id="warning" style={{ color: 'red' }}>
                        A data não pode ficarem branco!
                    </div>
                    : null}
                {showPaymentMethodWarning && !data.paymentMethodId ?
                    <div id="warning" style={{ color: 'red' }}>
                        A forma de pagamento não pode ficarem branco!
                    </div>
                    : null}
                {creditId === true && resourceId === false && !data.paymentMethodId ?
                    <div id="warning" style={{ color: 'red' }}>
                        A forma de pagamento não pode ficarem branco!
                    </div>
                    : null}
                {creditId === false && resourceId === true && !data.paymentMethodId ?
                    <div id="warning" style={{ color: 'red' }}>
                        A forma de pagamento não pode ficarem branco!
                    </div>
                    : null}
                {showCategoryWarning && !data.category ?
                    <div id="warning" style={{ color: 'red' }}>
                        A categoria da despesa não pode ficarem branco!
                    </div>
                    : null}
                {/* // Usado em 'parcelas': */}
                {showLastWarning && !data.last ?
                    <div id="warning" style={{ color: 'red' }}>
                        O número de parcelas não pode ficarem branco!
                    </div>
                    : null}
                {showCreditCardWarning && !data.creditCardId ?
                    <div id="warning" style={{ color: 'red' }}>
                        O cartão de crédito não pode ficarem branco!
                    </div>
                    : null}
                {creditValue < Number(data.value * data.last) ?
                    <div id="warning" style={{ color: 'red' }}>
                        Você não possui limite disponível para esse parcelamento!
                    </div>
                    : null}
                {/* // Usado em 'creditos': */}
                {showTotalWarning && !data.taken ?
                    <div id="warning" style={{ color: 'red' }}>
                        O limite tomado não pode ficarem branco!
                    </div>
                    : null}
                <span id="button-container">



                    {/* Os conjuntos lógicos abaixo definem os critérios de validação para permitir o envio dos inputs acima: */}
                    {/* Usado em '/recursos': */}
                    {useThis === resources &&
                        <>
                            {!data.name || !data.value ?
                                <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                            <button id="cancel" type='button' onClick={() => {
                                toggleWarnings();
                                location.reload();
                                navigate(-1);
                            }}><img src={Cancel} /></button>
                        </>
                    }
                    {/* Usado em '/poupanças': */}
                    {useThis === savings &&
                        <>
                            {!data.name || !data.value ?
                                <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                            <button id="cancel" type='button' onClick={() => {
                                toggleWarnings();
                                location.reload();
                                navigate(-1);
                            }}><img src={Cancel} /></button>
                        </>
                    }
                    {/* Usado em '/contas': */}
                    {useThis === bills && <>
                        {!data.name || !data.value || !data.expiration ?
                            <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                        <button id="cancel" type='button' onClick={() => {
                            toggleWarnings();
                            location.reload();
                            navigate(-1);
                        }}><img src={Cancel} /></button>
                    </>}
                    {/* Usado em '/despesas': */}
                    {useThis === expenses && <>
                        {!data.name || !data.value || !data.date || !data.paymentMethodId || !data.category ?
                            <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                        <button id="cancel" type='button' onClick={() => {
                            toggleWarnings(); showTotalWarning
                            location.reload();
                            navigate(-1);
                        }}><img src={Cancel} /></button>
                    </>}
                    {/* Usado em '/parcelas': */}
                    {useThis === installments && <>
                        {!data.name || !data.value || !data.last || !data.creditCardId || creditValue < (data.value * data.last) ?
                            <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                        <button id="cancel" type='button' onClick={() => {
                            toggleWarnings();
                            location.reload();
                            navigate(-1);
                        }}><img src={Cancel} /></button>
                    </>}
                    {/* Usado em '/creditos': */}
                    {useThis === credits && <>
                        {!data.name || !data.value ?
                            <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                        <button id="cancel" type='button' onClick={() => {
                            toggleWarnings();
                            location.reload();
                            navigate(-1);
                        }}><img src={Cancel} /></button>
                    </>}
                </span>
            </Form >
        </div>
    )
}