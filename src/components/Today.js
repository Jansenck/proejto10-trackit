import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import dayjs, { locale } from "dayjs";
import "dayjs/locale/pt-br";

import axios from "axios";

import UserContexts from "../contexts/UserContexts";

export default function Today(){

    const {token} = useContext(UserContexts);

    const [habits, setHabits] = useState([]);

    dayjs.locale('pt-br');
    const today = dayjs().format("dddd, DD/MM")

    useEffect(()=>{

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        };
        const promise = axios.get(URL, config);
        promise.then((response)=> console.log(response.data));
        promise.then(err => console.log(err));

    });

    return(
        <Container>
            <Section>
                <p>{today.charAt(0).toUpperCase() + today.slice(1)}</p>
                <p>Nenhum hábito concluído ainda</p>
            </Section>

            <Habit>
                <div>
                    <Infos>
                        <p>Nome do hábito</p>
                        <p>Sequência atual: 2 dias</p>
                        <p>Seu recorde: 5 dias</p>
                    </Infos>
                    
                    <Icon>
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </Icon>         
                </div>
            </Habit>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    box-sizing: border-box;
`;

const Section = styled.div`
    height: 13vh;
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    p:nth-child(1){
        font-size: 23px;
        color: #126BA5;
    }
    p:nth-child(2){
        font-size: 18px;
        color: #DADADA;
    }
`;

const Habit = styled.div`
    height: 15vh;
    width: 100%;
    border-radius: 5px;
    padding: 5%;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-bottom: 3vh;

    div{
        height: 100%;
        display: flex; 
        justify-content: space-between;
    }

`;

const Infos = styled.div`
    height: 80%;
    width: 70%;
    flex-direction: column;
`;

const Icon = styled.div`
    height: 100%;
    width: 25%;
    background: #8FC549;
    border-radius: 5px;
    color: #ffffff;
    font-size: 55px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;

    ion-icon{
        width: 100%;
    }
`;