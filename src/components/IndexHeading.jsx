import { useState } from "react";

import { saveInfo, globalSave, localStorageClear, addData, loadData, updateData, deleteData, totalData } from "../utils/functions";

import { v4 as uuid } from "uuid";

import "../../public/IndexHeading.css";

import Cancel from "../assets/cancel.svg";
import Confirm from "../assets/confirm.svg";

export default function IndexHeading() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',];
    const [confirmReset, setConfirmReset] = useState(false);
    const updateConfirmReset = () => {
        setConfirmReset(!confirmReset);
    }
    const reset = () => {
        // Salva o título do período no formato 'Mês/(Ano)':
        saveInfo(`${months[month]}(${year})`);
        // Salva as informações do período atual em 'localStorage.globalSave':
        globalSave();
        // Pega as contas presentes (não pagas) e as salva em 'unpaidBills':
        let getBills = loadData('bills');
        getBills.map(e => addData(e, 'unpaidBills'));
        // Pega os parcelamentos em aberto e os salva em 'sideInstallments':
        let getInstallments = loadData('installments');
        getInstallments.map(e => addData(e, 'sideInstallments'));
        // Pega os créditos existentes e os salva em 'sideCredits':
        let getCredits = loadData('credits');
        getCredits.map(e => addData(e, 'sideCredits'));
        // Limpa campos selecionados do 'localStorage':
        localStorageClear();
        // *** 
        // Pega as contas não pagas e as adiciona as contass atuais:
        const reGetBills = loadData('unpaidBills');
        if (reGetBills[0] !== undefined) {
            reGetBills.map(e => addData(e, 'contas'));
            reGetBills.map(e => deleteData(e.id, 'unpaidBills'));
        }
        // ***
        // ***
        // Adiciona os créditos cadastrados no passado ao período atual:
        const reGetCredits = loadData('sideCredits');
        if (reGetCredits[0] !== undefined) {
            reGetCredits.map(e => addData(e, 'creditos'));
            reGetCredits.map(e => deleteData(e.id, 'sideCredits'));
        }
        // ***
        // *** Adiciona as faturas de crédito às contas do período atual:
        let getInvoices = loadData('nextInvoices');
        getInvoices.map(e => updateData(e.id, { ...e, expiration: `${e.expiration.slice(0, 2)}/${Number(month === 11 ? month - 11 : month + 2)}` }, 'nextInvoices'));
        if (getInvoices[0] !== undefined) {
            getInvoices.map(e => addData(e, 'contas'));
            getBills = loadData('bills');
            getBills.map(e => updateData(e.id, { ...e, id: uuid() }, 'bills'));
            // getInvoices.map(e => deleteData(e.id, 'nextInvoices'));
        }
        // Remove os parcelamentos que acabaram neste mês:
        const reGetInstallments = loadData('sideInstallments');
        if (reGetInstallments[0] !== undefined) {
            reGetInstallments.map(e => addData(e, 'parcelas'));
            // Adiciona os parcelamentos em aberto aos parcelamentos do período atual e atualiza o progresso de parcelametos no tempo:
            // 
            reGetInstallments.map(e => deleteData(e.id, 'sideInstallments'));
        }
        let newInstallments = loadData('installments');
        const removeTheseInstallments = newInstallments.filter(e => (e.current === e.last));
        // newInstallments = loadData('installments');
        newInstallments.map(e => updateData(e.id, { ...e, current: e.current < e.last ? e.current + 1 : e.current }, 'installments'));
        const updateInvoicesValue = totalData(removeTheseInstallments);
        removeTheseInstallments.map(e => deleteData(e.id, 'installments'));
        getInvoices = loadData('nextInvoices');
        getInvoices.map(e => updateData(e.id, { ...e, value: e.installments - updateInvoicesValue, installments: e.installments - updateInvoicesValue, expenses: 0 }, 'nextInvoices'));
        const removeTheseInvoices1 = loadData('nextInvoices');
        const removeTheseInvoices2 = removeTheseInvoices1.filter(e => e.value === 0);
        removeTheseInvoices2.map(e => deleteData(e.id, 'nextInvoices'));
        location.reload();
    }
    const username = loadData('username');
    return (
        <>
            {confirmReset === false &&
                <div className="IndexHeading">
                    <div>
                        <h1>Olá, {username}!</h1>
                        <p>Confira abaixo seus recursos disponíveis e gerencie os pagamentos das contas em aberto.</p>
                    </div>
                    <button onClick={updateConfirmReset}>Finalizar mês</button>
                </div>}
            {confirmReset === true &&
                <div id="reset">
                    <p>Você deseja finalizar o mês atual ({months[month]}/{year})? Tenha certeza de que já concluiu todas as operações deste mês, pois esta ação não pode ser desfeita!</p>
                    <span><button onClick={reset}><img src={Confirm} /></button>Sim, finalizar mês.</span>
                    <span><button type='button' onClick={updateConfirmReset}><img src={Cancel} /></button>Não, continuar no mês atual.</span>
                </div>
            }
        </>

    )
}