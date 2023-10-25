import "../../public/RootHeader.css";

import { Link } from "react-router-dom";
import AtlasLogo from '../assets/compass.svg';
import Config from '../assets/config.svg';

export default function RootHeader() {
    return (
        <div className="RootHeader">
            <div id="header-container"><h2><img src={AtlasLogo} />Atlas</h2> <Link to='/configuracoes'><img src={Config} /></Link></div>
        </div>
    )
}