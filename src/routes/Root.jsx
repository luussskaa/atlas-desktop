import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

import IntroForm from "../components/IntroForm";
import Instructions from "../components/Instructions";
import RootContents from "../components/RootContents";
import RootHeader from "../components/RootHeader";

import { loadData } from "../utils/functions";

import { useLoaderData } from "react-router-dom";

export function loader() {
    const dataR = loadData('resources');
    const dataS = loadData('savings');
    const dataB = loadData('bills');
    const dataE = loadData('expenses');
    const dataI = loadData('installments');
    const dataC = loadData('credits');
    return { dataR, dataS, dataB, dataE, dataI, dataC };
}

import "../../public/Root.css"

export default function Root() {
    const loadUsername = loadData('username');
    const [user, setUser] = useState(loadUsername[0]);
    const { dataR, dataS, dataB, dataE, dataI, dataC } = useLoaderData();
    const [data, setData] = useState([dataR, dataS, dataB, dataE, dataI, dataC]);
    const updateData = () => {
        setData([dataR, dataS, dataB, dataE, dataI, dataC]);
    }
    useEffect(function myEffect() {
        updateData();
    }, [dataR]);
    const createUser = () => {
        setUser(loadData('username')[0])
    }
    const [instructions, setInstructions] = useState(false);
    const start = () => {
        scroll(0, 0);
        redirect('/');
        setInstructions(!instructions);
    }
    useEffect(function myEffect() {
        start();
    }, [user]);
    return (
        <div className="Root" >
            {user === undefined ?
                <>
                    <IntroForm createUser={createUser} />
                </>
                :
                instructions === false ?
                    <Instructions start={start} />
                    :
                    <>
                        <RootHeader />
                        <RootContents data={data} />
                    </>

            }
        </div >
    )
}

// RootNav
// RootMain
// RootAside