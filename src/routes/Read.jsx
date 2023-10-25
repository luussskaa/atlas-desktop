import { useState } from "react";

import AppList from "../components/AppList";
import InfoBar from "../components/InfoBar";
import SectionHeading from "../components/SectionHeading";

import { loadData, totalData } from "../utils/functions";

import { poupanças, recursos, contas, despesas, parcelas, creditos } from "../utils/texts";

import "../../public/Main.css";

let text = '';
let showEdit = '';

let useObject = '';
let r = '/recursos';
let p = '/poupan';
let c = '/contas';
let d = '/despesas';
let par = '/parcelas';
let cred = '/creditos';
let sendNameToFunction = '';


export default function Read() {
    if (window.location.pathname.includes(r)) {
        sendNameToFunction = 'resources';
        useObject = recursos;
    } else if (window.location.pathname.includes(p)) {
        sendNameToFunction = 'savings';
        useObject = poupanças;
    } else if (window.location.pathname.includes(c)) {
        sendNameToFunction = 'bills';
        useObject = contas;
    } else if (window.location.pathname.includes(d)) {
        sendNameToFunction = 'expenses';
        useObject = despesas;
    } else if (window.location.pathname.includes(par)) {
        sendNameToFunction = 'installments';
        useObject = parcelas;
    } else if (window.location.pathname.includes(cred)) {
        sendNameToFunction = 'credits';
        useObject = creditos;
    }
    const data = loadData(sendNameToFunction);
    const total = totalData(data);
    const [info, setInfo] = useState(false);
    const [links, setLinks] = useState(false)
    const showInfo = () => {
        setInfo(!info)
    }
    const showLinks = () => {
        setLinks(!links)
    }
    if (data[0] === undefined) {
        text = useObject.absent;
        showEdit = false;
    } else {
        text = useObject.present;
        showEdit = true;
    }
    return (
        <div className="Main">
            <SectionHeading title={useObject.title} text={text} infoFunction={showInfo} showEdit={showEdit} showLinks={showLinks} links={links} />
            {info === false ? null :
                <InfoBar infoMessage={useObject.infoMessage} />
            }
            {data[0] !== undefined && <AppList title={useObject.title} total={total}
                list={data} links={links} />}
        </div>
    )
}