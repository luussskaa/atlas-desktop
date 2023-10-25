import AppList from "../components/AppList";
import AppListLarge from "../components/AppListLarge";
import IndexHeading from "../components/IndexHeading";

import { loadData, totalData } from "../utils/functions";

import "../../public/Main.css";


export default function Index() {
    const resData = loadData('resources');
    const totalRes = totalData(resData);
    const billsData = loadData('bills');
    const totalBills = totalData(billsData);
    return (
        <div className="Main">
            <IndexHeading />
            <AppList title='Recursos' total={totalRes} list={resData} />
            <AppListLarge title='Contas a pagar' total={totalBills} list={billsData} />
        </div>
    )
}