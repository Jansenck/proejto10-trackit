import styled from "styled-components";

import logo from "../assets/bigLogo.png";
import monster from "../assets/monster.jpg"


export default function Header(){

    return( 
        <Head>
            <h1>Trackit</h1>
            <img src={monster} alt={monster}/>
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
        height: 72%;
        width: 15%;
        border-radius: 100%;
        background-color: #ffffff;
    }
`;


