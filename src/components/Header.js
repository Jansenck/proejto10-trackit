import { useContext, useEffect } from "react";
import UserContexts from "../contexts/UserContexts";

import styled from "styled-components";

export default function Header(){

    const {image} = useContext(UserContexts);
    
    const serializedUsedData = localStorage.getItem("localUserData");
    const localUserData = JSON.parse(serializedUsedData);

    return( 
        <Head>
            <h1>Trackit</h1>
            <img src={localUserData !== undefined? localUserData.image : image} alt={localUserData !== undefined? localUserData.image : image}/>
        </Head>
    );
}

const Head = styled.div`
    height: 10vh;
    width: 100%;
    padding-inline: 5%;
    box-sizing: border-box;
    background-color: #126BA5;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
        font-family: 'Playball', cursive;
        font-size: 40px;
        font-weight: 400;
        color: #ffffff;
    }
    img{
        height: 60px;
        width: 60px;
        border-radius: 100%;
        background-color: #ffffff;
    }
`;


