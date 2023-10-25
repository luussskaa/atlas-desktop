import { useState } from "react";

import SectionHeadingForms from "../../components/SectionHeadingForms";

import { Form, redirect, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { poupanças, recursos, contas, despesas, parcelas, creditos } from "../../utils/texts";

import { addData } from "../../utils/functions";

import Cancel from "../assets/cancel.svg";
import Confirm from "../assets/confirm.svg";

import "../../public/AppForm.css"

let formData;
let showNameWarning = false;
let showValueWarning = false;

let r = '/recursos';
let p = '/poupan%C3%A7as';
let c = '/contas';
let d = '/despesas';
let par = '/parcelas';
let cred = '/creditos';

let redirectTo = '';
let location = '';
let useObject = '';

export function action() {
    if (window.location.pathname.includes(r)) {
        redirectTo = '/recursos';
        location = r.replaceAll('/', '');
    } else if (window.location.pathname.includes(p)) {
        redirectTo = '/poupanças';
        location = p.replaceAll('/', '');
    } else if (window.location.pathname.includes(c)) {
        redirectTo = '/contas';
        location = c.replaceAll('/', '');
    } else if (window.location.pathname.includes(d)) {
        redirectTo = '/despesas';
        location = d.replaceAll('/', '');
    } else if (window.location.pathname.includes(par)) {
        redirectTo = '/parcelas';
        location = par.replaceAll('/', '');
    } else if (window.location.pathname.includes(cred)) {
        redirectTo = '/creditos';
        location = cred.replaceAll('/', '');
    }
    addData(formData, location);
    showNameWarning = false;
    showValueWarning = false;
    return redirect(redirectTo);
}

export default function Create() {
    if (window.location.pathname.includes(r)) {
        useObject = recursos;
    } else if (window.location.pathname.includes(p)) {
        useObject = poupanças;
    } else if (window.location.pathname.includes(c)) {
        useObject = contas;
    } else if (window.location.pathname.includes(d)) {
        useObject = despesas;
    } else if (window.location.pathname.includes(par)) {
        useObject = parcelas;
    } else if (window.location.pathname.includes(cred)) {
        useObject = creditos;
    }
    const navigate = useNavigate();
    const [data, setData] = useState({ name: '', value: '', id: '' })
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        if (changedField === 'name') {
            showNameWarning = true;
        } else {
            showValueWarning = true;
        }
        const newValue = evt.target.value;
        setData(oldData => {
            oldData[changedField] = newValue;
            return { ...oldData, id: uuid() };
        });
    }
    const changeFormData = () => {
        formData = data;
    }
    const toggleWarnings = () => {
        showNameWarning = false;
        showValueWarning = false;
    }
    const title = [...useObject.title];
    title.pop();
    const prepTitle = title.toString().replaceAll(',', '');
    const useTitle = prepTitle[0].toLowerCase() + prepTitle.slice(1);
    return (
        <div className="Main">
            <SectionHeadingForms title={`Adicionar ${useTitle}`} text={useObject.textAdd} />
            <Form method="post" className="AppForm">
                <div>
                    <input type="text" name="name" id="name" placeholder={prepTitle} onChange={handleChange} value={data.name} />
                    <input type="number" name="value" id="value" placeholder="R$ 0,00" min={0} onChange={handleChange} value={data.value} />
                </div>
                {showNameWarning && !data.name ?
                    <div id="warning" style={{ color: 'red' }}>
                        {prepTitle} não pode ficar em branco!
                    </div>
                    : null}
                {showValueWarning && !data.value ?
                    <div id="warning" style={{ color: 'red' }}>
                        O valor não pode ficar em branco!
                    </div>
                    : null}
                <span>
                    {!data.name || !data.value ?
                        <button disabled><img src={Confirm} /></button> : <button id="confirm" onClick={changeFormData}><img src={Confirm} /></button>}
                    <button id="cancel" type='button' onClick={() => {
                        toggleWarnings();
                        navigate(-1);
                    }}><img src={Cancel} /></button>
                </span>
            </Form >
        </div>
    )
}