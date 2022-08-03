import { Link } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";

export default function Today(){

    return(
        <Container>
            <Section>
                <p>Quarta, 03/08</p>
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
    background-color: #e5e5e5;
`;

const Section = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    

    p{
        font-size: 18px;
        color: #126BA5;
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