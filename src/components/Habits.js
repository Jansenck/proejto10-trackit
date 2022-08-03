import { Link } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";

export default function Habits(){

    const [thereAreHabits, setThereAreHabits] = useState(false);
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];

    return(
        <Container>
            <Section>
                <p>Meus Hábitos</p>
                <div>
                    <ion-icon name="add"></ion-icon>
                </div>
            </Section>

            <CreateHabit>
                <input type="text" placeholder="nome do hábito"/>
                <Days>
                    {
                        days.map((day, index) =>{
                            return(
                                <div type="text" key={index}>{day}</div>
                            );
                        })
                    }
                </Days>

                <Buttons>
                    <button>Cancelar</button>
                    <button type="submit">Salvar</button>
                </Buttons>
                
            </CreateHabit>
                
            <UserHabits>
                <div>
                    <p>Nome do hábito</p>
                    <ion-icon name="trash-outline"></ion-icon>
                </div>
                <Days>
                    {
                        days.map((day, index) =>{
                            return(
                                <div type="text" key={index}>{day}</div>
                            );
                        })
                    }
                </Days>
            </UserHabits>

            <Message>
                <p>
                    Você não tem nenhum hábito cadastrado ainda. 
                    Adicione um hábito para começar a trackear!
                </p>
            </Message>
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p{
        font-size: 24px;
        color: #126BA5;
    }

    div{
        height: 60%;
        width: 12%;
        background-color: #52B6FF;
        color: #ffffff;
        font-size: 25px;
        font-weight: 700;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Message = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;

    display: none;

    p{
        font-size: 18px;
        color: #666666;
    }
`;

const CreateHabit = styled.form`
    height: 25vh;
    width: 100%;
    border-radius: 5px;
    padding: 5%;
    box-sizing: border-box;
    background-color: #ffffff;
    position: relative;

    display: none;

    input{
        height: 30%;
        width: 99%;
        margin-bottom: 3%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color: #666666;
    }
    input::placeholder{
        font-size: 20px;
        color: #DBDBDB;
    }
    button{
        height: 100%;
        width: 45%;
        border-radius: 5px;
    }
    button:nth-child(1){
        background-color: #ffffff;
        color: #52B6FF;
    }
    button:nth-child(2){
        background-color: #52B6FF;
        color: #ffffff;
    }
`;

const Buttons = styled.div`
    height: 25%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 5%;
    bottom: 10%;
`;

const Days = styled.div`
    height: 20%;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div{
        height: 100%;
        width: 12%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 15px;
        color: #DBDBDB;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const UserHabits = styled.div`
    height: 15vh;
    width: 100%;
    border-radius: 5px;
    padding: 5%;
    box-sizing: border-box;
    background-color: #ffffff;
    position: relative;
    margin-bottom: 3vh;

    display: none;

    div{
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;