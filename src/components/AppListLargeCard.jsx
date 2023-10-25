import { useState } from "react";

import { deleteData, loadData, updateData, getData, addData } from "../utils/functions";

import Cancel from "../assets/cancel.svg";
import Confirm from "../assets/confirm.svg";

import "../../public/AppListLargeCard.css";

let id = 0;
let getName = '';
let newValue = 0;

export default function AppListLargeCard({ idInfo, name, value, expiration, creditCardId }) {
    const data = loadData('resources');
    let loadOptions = false;
    const [payment, setPayment] = useState(loadOptions);
    const showOptions = () => {
        setPayment(loadOptions = true);
    }
    const showOptions2 = () => {
        setPayment(loadOptions = false);
    }
    const handleChange = (evt) => {
        const event = evt.target.value;
        id = event.slice(event.indexOf('(')).replaceAll('(', '').replaceAll(')', '');
        getName = event.slice(0, event.indexOf('/'));
        const isolateValueA = event.indexOf('$');
        const isolateValueB = event.indexOf('(');
        newValue = event.slice(isolateValueA + 1, isolateValueB) - value;
    }
    const paid = () => {
        const getBill = getData(idInfo, 'bills')
        addData(getBill, 'paidBills');
        updateData(id, { name: getName, value: newValue, id: id }, 'resources');
        if (getBill.fatura === true) {
            const getCredit = getData(creditCardId, 'credits');
            updateData(creditCardId, { ...getCredit, value: getCredit.value + value }, 'credits');
            const getInvoice = getData(idInfo, 'nextInvoices');
            updateData(idInfo, { ...getInvoice, value: getInvoice.value - value }, 'nextInvoices');
            const removeTheseInvoices1 = loadData('nextInvoices');
            const removeTheseInvoices2 = removeTheseInvoices1.filter(e => e.value <= 0);
            removeTheseInvoices2.map(e => deleteData(e.id, 'nextInvoices'));
        }
        deleteData(idInfo, 'bills');
        location.reload();
    }
    const filteredResources = data.filter(e => Number(e.value) >= value).map(e => <option key={e.id} value={`${e.name} / R$ ${e.value} (${e.id})`}>{e.name} (R$ {e.value})</option>);
    return (
        <div key={idInfo} className="AppListLargeCard">
            {payment === false ?
                <>
                    <span>{name}</span>
                    <span>R$ {value}</span>
                    <span>Venc. {expiration}</span>
                    {data[0] === undefined ? <button>Não há recursos</button> :
                        filteredResources[0] === undefined ? <button>Recursos insuficientes!</button> :
                            <button onClick={showOptions}>Pagar</button>}
                </> :
                <>
                    <span>Pagamento</span>
                    <select defaultValue={'Selecione o recurso'} onChange={handleChange}>
                        <option disabled defaultValue>Selecione o recurso</option>
                        {filteredResources}
                    </select>
                    <span id="payment-buttons"><button onClick={paid}><img src={Confirm} /></button><button onClick={showOptions2}><img src={Cancel} /></button></span>

                </>
            }
        </div >
    )
}

// name
// value
// expiration
// isPaid?