import { Link } from "react-router-dom";

import "../../public/RootNav.css"
import Início from "../assets/Início.svg";
import Relatório from "../assets/Relatório.svg";
import Recursos from "../assets/Recursos.svg";
import Poupança from "../assets/Poupança.svg";
import Custos from "../assets/Custos.svg";
import Despesas from "../assets/Despesas.svg";
import Parcelas from "../assets/Parcelas.svg";
import Crédito from "../assets/Crédito.svg";

export default function RootNav() {
    return (
        <div className="RootNav">
            <Link to='/'><img src={Início} />Início</Link>
            <Link to='/recursos'><img src={Recursos} />Recursos</Link>
            <Link to='/poupanças'><img src={Poupança} />Poupanças</Link>
            <Link to='/contas'><img src={Custos} />Contas</Link>
            <Link to='/despesas'><img src={Despesas} />Despesas</Link>
            <Link to='/parcelas'><img src={Parcelas} />Parcelas</Link>
            <Link to='/creditos'><img src={Crédito} />Créditos</Link>
            <Link to='/relatorio'><img src={Relatório} />Relatório</Link>
        </div>
    )
}