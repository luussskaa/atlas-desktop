import { useState } from "react";

import AtlasLogo from '../assets/compass.svg';
import Confirm from "../assets/confirm.svg";
import { addData } from "../utils/functions";

import "../../public/IntroForm.css";

export default function IntroForm({ createUser }) {
    const [username, setUsername] = useState('');
    const handleChange = (evt) => {
        setUsername(evt.target.value)
    }
    const saveUsername = () => {
        addData(username, 'username');
        createUser();
    }
    return (
        <div id="introForm-container">
            <h2><img src={AtlasLogo} />Atlas</h2>
            <div className="IntroForm">
                {username === '' ? <h1>Olá!</h1> : <h1>Olá, {username}!</h1>}
                <p>Como devemos te chamar?</p>
                <input onChange={handleChange} type="text" name="username" id="username" value={username} />
                {username !== '' ? <button onClick={saveUsername}><img src={Confirm} /></button> : <button disabled><img src={Confirm} /></button>}
            </div>
        </div>
    )
}