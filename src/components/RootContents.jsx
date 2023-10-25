import { Outlet } from "react-router-dom";

import RootAside from "./RootAside";
import RootNav from "./RootNav";

import "../../public/RootContents.css";


export default function RootContents({ data }) {
    return (
        <div className="RootContents">
            <RootNav />
            <Outlet />
            <RootAside data={data} />
        </div>
    )
}