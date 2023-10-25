import { redirect } from "react-router-dom";

import { deleteData, getData, updateData } from "../utils/functions";

let r = '/recursos/';
let p = '/poupan%C3%A7as/';
let c = '/contas/';
let d = '/despesas/';
let par = '/parcelas/';
let cred = '/creditos/';

let id = 0;
let redirectTo = '';
let locatioN = '';

export function action() {
    if (window.location.pathname.includes(r)) {
        id = window.location.pathname.slice(r.length, -7);
        locatioN = 'resources';
        redirectTo = '/recursos';
    } else if (window.location.pathname.includes(p)) {
        id = window.location.pathname.slice(p.length, -7);
        locatioN = 'savings';
        redirectTo = '/poupanças';
    } else if (window.location.pathname.includes(c)) {
        id = window.location.pathname.slice(c.length, -7);
        locatioN = 'bills';
        redirectTo = '/contas';
    } else if (window.location.pathname.includes(d)) {
        id = window.location.pathname.slice(d.length, -7);
        locatioN = 'expenses';
        redirectTo = '/despesas';
    } else if (window.location.pathname.includes(par)) {
        id = window.location.pathname.slice(par.length, -7);
        locatioN = 'installments';
        redirectTo = '/parcelas';
    } else if (window.location.pathname.includes(cred)) {
        id = window.location.pathname.slice(cred.length, -7);
        locatioN = 'credits';
        redirectTo = '/creditos';
    }
    if (window.location.pathname.includes(par)) {
        const getInstallment = getData(id, locatioN);
        const getCreditCard = getData(getInstallment.creditCardId, 'credits');
        updateData(getInstallment.creditCardId, { ...getCreditCard, value: getCreditCard.value + (getInstallment.value * (getInstallment.last - getInstallment.current + 1)) }, 'credits');
    }
    if (window.location.pathname.includes(d)) {
        const getExpense = getData(id, locatioN);
        const getPaymentMethodId = getExpense.paymentMethodId;
        const IdentifyPayment = getExpense.paymentIdLetter;
        if (IdentifyPayment === 'R') {
            const getPaymentMethod = getData(getPaymentMethodId, 'resources');
            updateData(getPaymentMethodId, { ...getPaymentMethod, value: getPaymentMethod.value + getExpense.value }, 'resources');
        } else if (IdentifyPayment === 'C') {
            const getPaymentMethod = getData(getPaymentMethodId, 'credits');
            updateData(getPaymentMethodId, { ...getPaymentMethod, value: getPaymentMethod.value + getExpense.value }, 'credits');
        }
    }
    if (window.location.pathname.includes(p)) {
        const getSaving = getData(id, locatioN);
        const getResourceId = getSaving.resourceId;
        const getResource = getData(getResourceId, 'resources');
        updateData(getResourceId, { ...getResource, value: getResource.value + getSaving.value }, 'resources');
    }
    deleteData(id, locatioN);
    return redirect(redirectTo);
}