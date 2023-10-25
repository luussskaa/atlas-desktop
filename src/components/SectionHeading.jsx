import "../../public/SectionHeading.css";

import { Link } from "react-router-dom";

import Add from "../assets/add.svg";
import Info from "../assets/info.svg";
import Edit from "../assets/edit.svg";


export default function SectionHeading({ title, text, infoFunction, showEdit, showLinks, links }) {
    let lowerCasedTitle = title[0].toLowerCase() + title.slice(1);
    if (title === 'Créditos') {
        let newCredits = 'Creditos';
        lowerCasedTitle = newCredits[0].toLowerCase() + newCredits.slice(1);
    }
    return (
        <div className="SectionHeading">
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
                {links &&
                    <h4>Selecione abaixo o item que deseja editar ou clique <span style={{ color: 'red', cursor: 'pointer' }} onClick={showLinks}>aqui</span> para cancelar.</h4>}
            </div>
            <div>
                {!links &&
                    <>
                        <img onClick={infoFunction} src={Info} />
                        <Link to={`/${lowerCasedTitle}/adicionar`} ><img src={Add} /></Link>
                        {showEdit &&
                            <img onClick={showLinks} src={Edit} />}
                    </>
                }
            </div>
        </div >
    )
}