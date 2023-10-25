import { Link } from "react-router-dom";

import "../../public/AppList.css";

export default function AppList({ title, total, list, links }) {
    let lowerCasedTitle = title[0].toLowerCase() + title.slice(1);
    if (title === 'Créditos') {
        let newCredits = 'Creditos';
        lowerCasedTitle = newCredits[0].toLowerCase() + newCredits.slice(1);
    }
    return (
        <div className="AppList">
            <div key={'a'}>
                <span>{title}</span>
                <span>R$ {total}</span>
            </div>
            {links ?
                list.map(e =>
                    <Link key={e.id} to={`/${lowerCasedTitle}/${e.id}/editar`}>
                        <span>{e.name}</span>
                        <span>R$ {e.value}</span>
                        <span style={{ display: title !== 'Contas' ? 'none' : 'inline' }}>{e.expiration}</span>
                        <span style={{ display: title !== 'Despesas' ? 'none' : 'inline' }}>{e.date}</span>
                        <span style={{ display: title !== 'Despesas' ? 'none' : 'inline' }}>({e.paymentMethodName})</span>
                        <span style={{ display: title !== 'Despesas' ? 'none' : 'inline' }}><b><i>{e.category}</i></b></span>
                        <span style={{ display: title !== 'Parcelas' ? 'none' : 'inline', width: '80px' }}>{e.current}/{e.last}</span>
                        <span style={{ display: title !== 'Parcelas' ? 'none' : 'inline' }}>({e.creditCardName})</span>
                        <span style={{ display: title !== 'Créditos' ? 'none' : 'inline' }}>(R$ {e.total})</span>
                        <span style={{ display: title !== 'Créditos' ? 'none' : 'inline' }}>Venc. {e.expiration}</span>
                    </Link>)
                : list.map(e =>
                    <div key={e.id}>
                        <span>{e.name}</span>
                        <span>R$ {e.value}</span>
                        <span style={{ display: title !== 'Contas' ? 'none' : 'inline' }}>{e.expiration}</span>
                        <span style={{ display: title !== 'Despesas' ? 'none' : 'inline' }}>{e.date}</span>
                        <span style={{ display: title !== 'Despesas' ? 'none' : 'inline' }}>({e.paymentMethodName})</span>
                        <span style={{ display: title !== 'Despesas' ? 'none' : 'inline' }}><b><i>{e.category}</i></b></span>
                        <span style={{ display: title !== 'Parcelas' ? 'none' : 'inline', width: '80px' }}>{e.current}/{e.last}</span>
                        <span style={{ display: title !== 'Parcelas' ? 'none' : 'inline' }}>({e.creditCardName})</span>
                        <span style={{ display: title !== 'Créditos' ? 'none' : 'inline' }}>(R$ {e.total})</span>
                        <span style={{ display: title !== 'Créditos' ? 'none' : 'inline' }}>Venc. {e.expiration}</span>
                    </div>)}
        </div>
    )
}