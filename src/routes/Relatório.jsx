import SectionHeadingForms from "../components/SectionHeadingForms";

import "../../public/Main.css";
import "../../public/Relatorios.css";

import { loadGlobalSave } from "../utils/functions";

import { relatorio } from "../utils/texts";

export default function Relatório() {
    const data = loadGlobalSave();
    return (
        <div className="Main">

            <SectionHeadingForms title={relatorio.title} text={data ? relatorio.present : relatorio.absent} />
            <div id="report-container" style={{ display: data === undefined && 'none' }}>
                {data &&
                    <>
                        {data.map(e =>
                            <div className="Relatorios">
                                <div><span>{e.info}</span></div>
                                <div><span>Recursos restantes</span><span>R$ {e.Recursos}</span></div>
                                <div><span>Poupança no período</span><span>R$ {e.Poupanças}</span></div>
                                <div><span>Contas pagas</span><span>R$ {e.ContasPG}</span></div>
                                <div><span>Contas atrasadas</span><span>R$ {e.ContasNP}</span></div>
                                <div><span>Despesas do período</span><span>R$ {e.Despesas}</span></div>
                                <div><span>Parcelas do período</span><span>R$ {e.Parcelas}</span></div>
                                <div><span>Créditos restantes</span><span>R$ {e.Créditos}</span></div>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    )
}