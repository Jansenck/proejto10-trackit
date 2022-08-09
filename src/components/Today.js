import { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import axios from "axios";

import UserContexts from "../contexts/UserContexts";

import Header from "./Header";
import Footer from "./Footer";

export default function Today(){

    const {token, progress, setProgress} = useContext(UserContexts);

    const serializedUsedData = localStorage.getItem("userData");
    const localUserData = JSON.parse(serializedUsedData);

    const [habits, setHabits] = useState([]);
    const [habitsDone, setHabitsDone] = useState(false);


    dayjs.locale('pt-br');
    const today = dayjs().format("dddd, DD/MM");

    useEffect(()=>{

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers:{
                "Authorization" : `Bearer ${localUserData !== null? localUserData.token : token}`
            }
        };

        const promise = axios.get(URL, config);

        promise.then((response)=> {

            const {data} = response;
            setHabits(data);
            updateHabitsDone(data);
        });
        promise.catch(error => {
            const {message} = error.response.data;
            window.alert(message);
        });

    });

    function sendHabitDone(habitId){

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`;

        const config = {
            headers:{
                "Authorization" : `Bearer ${localUserData !== null? localUserData.token : token}`
            }
        };

        const promise = axios.post(URL, null, config);

        promise.then(()=>{

            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
            const config = {
                headers:{
                    "Authorization" : `Bearer ${localUserData !== null? localUserData.token : token}`
                }
            };

            const promise = axios.get(URL, config);
            promise.then((response)=> {
                const {data} = response;
                setHabits(data);
                updateHabitsDone(data);
            });
            promise.catch(error => {
                const {message} = error.response.data;
                window.alert(message);
            });
        });

        promise.catch(error => {
            const {message} = error.response.data;
            window.alert(message);
        });
    }

    function removeHabitDone(habitId){

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`;

        const config = {
            headers:{
                "Authorization" : `Bearer ${localUserData !== null? localUserData.token : token}`
            }
        };

        const promise = axios.post(URL, null, config);

        promise.then(()=>{

            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
            const config = {
                headers:{
                    "Authorization" : `Bearer ${localUserData !== null? localUserData.token : token}`
                }
            };

            const promise = axios.get(URL, config);
            promise.then((response)=> {
                const {data} = response;
                setHabits(data);
                updateHabitsDone(data);
            });
            promise.catch(error => {
                const {message} = error.response.data;
                window.alert(message);
            });
        });

        promise.catch(error => {
            const {message} = error.response.data;
            window.alert(message);
        });
    }

    function updateHabitsDone(habits){

        const update = habits.filter(habit => {
            return habit.done;
        });

        if(update.length !== 0){
            setHabitsDone(true);
        } else {
            setHabitsDone(false);
        }
        
        const done = (update.length);
        const allHabits = (habits.length);
        const progressValue = parseInt((done/allHabits)*100);
        setProgress(progressValue);
    }

    return(
        <>
        <Header/>
        <Container>
            <Section>

                <p>{today.charAt(0).toUpperCase() + today.slice(1)}</p>

                {habitsDone?
                   <p style={{color: "#8FC549"}}>{progress}% dos hábitos concluídos</p>
                   :
                   <p>Nenhum hábito concluído ainda</p> 
                }
                
            </Section>

            {(habits.length !== 0)?

                habits.map((habit, index) =>{

                    const {id, name, done, currentSequence, highestSequence} = habit;
                    const recordSequence = ((currentSequence !== 0 ) && (currentSequence >= highestSequence));

                    return(
                        <Habit key={index}>
                            <div>
                                <Infos>
                                    <p>{name}</p>
                                    <div>
                                        <p>Sequência atual: 
                                            <span style={done? {color: "#8FC549"} : {}}>
                                                {currentSequence} dias
                                            </span>
                                        </p>
                                        <p>Seu recorde:  
                                            <span style={(recordSequence && done)? {color: "#8FC549"} : {}}>
                                                {highestSequence} dias
                                            </span>
                                        </p>
                                    </div>
                                </Infos>
                                
                                <Icon 
                                    style={done? {backgroundColor: "#8FC549"} : {}}
                                    onClick={()=> done? removeHabitDone(id) : sendHabitDone(id)}
                                >
                                    <ion-icon name="checkmark-outline"></ion-icon>
                                </Icon>         
                            </div>
                        </Habit>
                    );
                })
                :
                <></>
            }
            
        </Container>
        <Footer progress={progress}/>
        </>
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
    padding: 5% 0;
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
    height: 100px;
    width: 100%;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #ffffff;
    color: #666666;
    margin-bottom: 3vh;
    font-size: 20px;

    div{
        display: flex; 
        justify-content: space-between;
    }
    div:nth-child(1){
        height: 100%;
    }
`;

const Infos = styled.div`
    height: 80%;
    width: 70%;
    flex-direction: column;

    div{
        height: 35px;
        font-size: 13px;
        flex-direction: column;
        justify-content: space-around;
    }
`;

const Icon = styled.div`
    height: 70px;
    width: 70px;
    background: #E7E7E7;
    border-radius: 5px;
    color: #ffffff;
    font-size: 55px;
    font-style: bold;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;

    ion-icon{
        width: 100%;
    }
`;