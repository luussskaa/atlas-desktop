import { useState } from "react";

import SectionHeadingForms from "../../components/SectionHeadingForms";
import AppList from "../../components/AppList";

import { useNavigate, redirect } from "react-router-dom";

import { loadData, deleteData, totalData } from "../../utils/functions";

import Cancel from "../assets/cancel.svg";
import Confirm from "../assets/confirm.svg";
import Delete from "../assets/delete.svg";

import "../../public/Main.css";

export default function Pay() {
    const navigate = useNavigate();
    const resData = loadData('resources');
    const total = totalData(resData);
    const billData = loadData('bills');
    const useBill = billData.filter(e => e.ispaid === true);
    return (
        <div className="Main">
            <SectionHeadingForms title={`Pagar "${useBill[0].name}"?`} text='Selecione o recurso que fará o pagamento.' />
            <AppList title={'Recursos'} total={total}
                list={resData} />
        </div >
    )
}