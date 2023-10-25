import "../../public/AppListLarge.css"
import AppListLargeCard from "./AppListLargeCard"

export default function AppListLarge({ title, total, list }) {
    return (
        <div className="AppListLarge">
            <div id="header"><span>{title}</span><span>R$ {total}</span></div>
            <div id="cardContainer">
                {list.map(e => <AppListLargeCard key={e.id} name={e.name} value={e.value} expiration={e.expiration} ispaid={e.ispaid} idInfo={e.id} creditCardId={e.creditCardId} />)}
            </div>
        </div>
    )
}