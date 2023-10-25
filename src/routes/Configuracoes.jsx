import "../../public/Configuracoes.css";

import { Link, redirect } from "react-router-dom";

export default function Configuracoes() {
    const localStorageClear = () => {
        localStorage.clear();
        window.location.replace('/');
    }
    return (
        <div className="Configuracoes">
            <h1>Configurações:</h1>
            <br />
            <p onClick={localStorageClear}>- Recomeçar (deleta tudo pra você recomeçar do zero)</p>
            <Link to={'/instrucoes'}>- Dicas e informações importantes</Link>
        </div>
    )
}