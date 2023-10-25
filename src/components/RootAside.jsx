import "../../public/RootAside.css"

import { totalData } from "../utils/functions";

export default function RootAside({ data }) {
    const totalRes = totalData(data[0]);
    const totalSav = totalData(data[1]);
    const totalBills = totalData(data[2]);
    const totalExp = totalData(data[3]);
    const totalIns = totalData(data[4]);
    const totalCred = totalData(data[5]);
    let notCalculated = '';
    let notCalculatedColor = '';
    const totalResult = totalRes - totalBills - totalExp;
    if (totalRes === 0 && totalSav === 0 && totalBills === 0 && totalExp === 0 && totalIns === 0 && totalCred === 0) {
        notCalculated = true;
        notCalculatedColor = 'grey';
    } else {
        notCalculated = false;
        notCalculatedColor = 'blue';
    }
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',];
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];
    return (
        <div className="RootAside">
            <span className="heading">
                <h1>{months[month]}</h1>
                <p>{days[today.getDay()]}, {day} de {months[month]} de {today.getFullYear()}</p>
            </span>
            <div><span>Recursos</span><span>R$ {totalRes}</span></div>
            <div><span>Poupança</span><span>R$ {totalSav}</span></div>
            <div><span>Contas</span><span>R$ {totalBills}</span></div>
            <div><span>Despesas</span><span>R$ {totalExp}</span></div>
            <div><span>Parcelas</span><span>R$ {totalIns}</span></div>
            <div><span>Créditos</span><span>R$ {totalCred}</span></div>
            <span className="result" style={{ backgroundColor: totalResult === 0 ? notCalculatedColor : totalResult < 0 ? 'red' : '#2CBE78' }}>
                <span>Resultado</span>
                <span>{notCalculated ? 'Não calculado' : `R$ ${totalResult}`}</span>
            </span>
        </div>
    )
}