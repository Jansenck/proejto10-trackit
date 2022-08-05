import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";

import UserContexts from "../contexts/UserContexts";

export default function Habits(){

    const {token} = useContext(UserContexts);

    const days = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [habits, setHabits] = useState({name: "", days: []});
    const [loading, setLoading] = useState(false);
    const [disableForm, setDisableForm] = useState("");

    const [thereAreHabits, setThereAreHabits] = useState(false); 
    const [cancelCreateHabit, setCancelCreateHabit] = useState("");

    function sendDays(day){

        console.log(day)

        const {days} = habits; 

        const dayAlreadyIncluded = days.includes(day);

        if(dayAlreadyIncluded){
            const index = days.indexOf(day);
            if(index > -1){
                days.splice(index, 1);
                const updateDays = days;
                setHabits({...habits, days: updateDays});
            }
        } else {
            const updateDays = [...days, day];
            setHabits({...habits, days: updateDays});
        }
    }

    function sendHabits(event){

        event.preventDefault();

        setLoading(true);
        setDisableForm("disabled");

        const {name, days} = habits;
        const invalidDataHabit = (name === "" || days.length === 0);

        if(invalidDataHabit){
            window.alert("Para criar o seu hábito dê um nome ao seu hábito e selecione pelo menos 1 dia.");
            setLoading(false);
            setDisableForm("");

        } else {
            
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            const body = habits;

            const promise = axios.post(URL, body, config);
            promise.then(res => console.log(res));
            promise.catch(resp => console.log(resp))
        }
    }

    return(
        <Container disabled={disableForm}> {/*style={{cursor: "wait"}} disabled={"disabled"}*/}
            <Section>
                <p>Meus Hábitos</p>
                <div>
                    <ion-icon name="add"></ion-icon>
                </div>
            </Section>

            <CreateHabit 
                onSubmit={sendHabits}
                style={{display: cancelCreateHabit}}>   

                <input type="text" placeholder="nome do hábito"
                    onChange={(e) => setHabits({...habits, name: e.target.value})}/>

                <Days loading={loading}>
                    {
                        days.map((day, index) =>{

                            const {days} = habits;   
                            const selectedDay = days.includes(index+1);     
                            return(             
                                <div 
                                    type="text" 
                                    key={index}
                                    
                                    placeholder={day}
                                    style={selectedDay ? {backgroundColor:"#CFCFCF", color:"#FFFFFF"} : {}}
                                    onClick={()=> sendDays(index+1)}>
                                    {day}
                                </div>
                            );
                        })
                    }
                </Days>
                    
                <Buttons>

                    <button onClick={()=> setCancelCreateHabit("none")}>Cancelar</button>
                    
                    {loading?
                    <button 
                        style={{
                            display: "flex", 
                            justifyContent: "center", 
                                alignItems: "center", 
                                opacity: "0.7"
                            }}>

                        <ThreeDots 
                            height="50" 
                            width="50" 
                            radius="9"
                            color="#ffffff" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> 
                        </button>
                        :
                        <button type="submit">Salvar</button>   
                    }
                    
                </Buttons>
                
            </CreateHabit>
                
            <UserHabits>
                <div>
                    <p>Nome do hábito</p>
                    <ion-icon name="trash-outline"></ion-icon>
                </div>
                <Days loading={loading}>
                    {
                        days.map((day, index) =>{
                            return(
                                <div type="text" key={index} placeholder={day}></div>
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

const Container = styled.fieldset`
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
    ${(props) => props.loading?  "pointer-events: none;" : undefined };

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