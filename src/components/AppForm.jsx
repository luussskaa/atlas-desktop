import { Form, redirect, useNavigate } from "react-router-dom";

import Cancel from "../src/assets/cancel.svg";
import Confirm from "../src/assets/confirm.svg";

import "../public/AppForm.css"
import { useState } from "react";

export default function AppForm() {
    const navigate = useNavigate();
    const [resources, setResources] = useState({ resource: '', value: '' })
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        console.log(resources)
        setResources(oldResources => {
            oldResources[changedField] = newValue;
            return { ...oldResources };
        })
    }
    return (
        <Form method="post" className="AppForm">
            <div>
                <input type="text" name="resource" id="resource" placeholder="Recurso" onChange={handleChange} value={resources.resource} />
                <input type="number" name="value" id="value" placeholder="R$ 0,00" min={0} onChange={handleChange} value={resources.value} />
            </div>
            <span>
                <button><img src={Confirm} /></button>
                <button onClick={() => navigate(-1)}><img src={Cancel} /></button>
            </span>
        </Form >
    )
}