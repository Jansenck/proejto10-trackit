import { useState, useContext, useEffect } from "react";

import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import UserContexts from "../contexts/UserContexts";

import Header from "./Header";
import Footer from "./Footer";

export default function Habits(){

    const {token} = useContext(UserContexts);

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [newHabit, setNewHabit] = useState({name: "", days: []});
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [disableForm, setDisableForm] = useState("");
    const [cancelCreateHabit, setCancelCreateHabit] = useState(true);

    useEffect(()=>{

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }

        const request = axios.get(URL, config);
        request.then(res => setHabits(res.data));
        request.catch(res => console.log(res));

    })

    function sendDays(day){

        const {days} = newHabit; 

        const dayAlreadyIncluded = days.includes(day);

        if(dayAlreadyIncluded){
            const index = days.indexOf(day);
            if(index > -1){
                days.splice(index, 1);
                const updateDays = days;
                setNewHabit({...newHabit, days: updateDays});
            }
        } else {
            const updateDays = [...days, day];
            setNewHabit({...newHabit, days: updateDays});
        }
    }

    function sendHabits(event){

        event.preventDefault();

        setLoading(true);
        setDisableForm("disabled");

        const {name, days} = newHabit;
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

            const body = newHabit;

            const promise = axios.post(URL, body, config);
            promise.then(() => {
                const refreshNewHabit = {name: "", days: []}
                setNewHabit(refreshNewHabit);
                setCancelCreateHabit(true);
                setLoading(false);
                setDisableForm("");
            });

            promise.catch(resp => console.log(resp))
        }
    }

    function deleteHabit(name, habitId){

        const toDeleteHabit = window.confirm(`Deseja deletar o hábito '${name}' ?`);

        if(toDeleteHabit){
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`;
            const config = {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            };

            const request = axios.delete(URL, config);
            request.then(()=>console.log('apaguei ai'));
            request.catch(()=> console.log('deu ruim ai'));
        } 
    }

    return(

        <>
            <Header/>
            <Container disabled={disableForm}> {/*style={{cursor: "wait"}}*/}
                <Section>
                    <p>Meus Hábitos</p>
                    <div onClick={()=> setCancelCreateHabit(false)}>
                        <ion-icon name="add"></ion-icon>
                    </div>
                </Section>

                <CreateHabit 
                    onSubmit={sendHabits}
                    style={cancelCreateHabit? {display: "none"} : {}}>   

                    <input type="text" placeholder="nome do hábito" value={newHabit.name}
                        onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}/>

                    <Days disablePointer={loading}>
                        {
                            weekdays.map((day, index) =>{

                                const {days} = newHabit;   
                                const selectedDay = days.includes(index+1);     
                                return(             
                                    <div 
                                        type="text" 
                                        key={index}
                                        style={selectedDay ? {backgroundColor:"#CFCFCF", color:"#FFFFFF"} : {}}
                                        onClick={()=> sendDays(index+1)}>
                                        {day}
                                    </div>
                                );
                            })
                        }
                    </Days>
                        
                    <Buttons>

                        <Cancel onClick={()=> setCancelCreateHabit(true)}>Cancelar</Cancel>
                        
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
                    
                {cancelCreateHabit?

                    habits.map(habit =>{

                        const {id, name, days} = habit;

                        return(
                            <UserHabits key={id}> {/*style={habits.length !== 0 ? {display:"initial"} : {}}*/}
                                <HabitName >
                                    <p>{name}</p>
                                    <ion-icon name="trash-outline" onClick={()=>deleteHabit(name, id)}></ion-icon>
                                </HabitName>

                                <Days disablePointer={loading}>
                                    
                                    {
                                        weekdays.map((day, index) =>{

                                            const includedDay = days.includes(index+1);
                                        
                                            return(
                                                <div 
                                                    key={index}
                                                    placeholder={day}
                                                    style={includedDay ? {backgroundColor:"#CFCFCF", color:"#FFFFFF"} : {}}
                                                    onClick={()=> sendDays(index+1)}>
                                                    {day}
                                                </div>
                                            );
                                        })
                                    }
                                </Days>
                            </UserHabits>
                        )
                    })
                    :
                    <></>
                }

                {(habits.length === 0)?
                    <Message>
                        <p>
                            Você não tem nenhum hábito cadastrado ainda. 
                            Adicione um hábito para começar a trackear!
                        </p>
                    </Message>
                    :
                    <></>
                }
            </Container>
            <Footer/>
        </>
    );
}

const Container = styled.fieldset`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    box-sizing: border-box;
    margin-bottom: 22%;
    background-color: #f2f2f2;
    margin-bottom: 22%;
`;

const Section = styled.div`
    height: 85px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    box-sizing: border-box;

    p{
        font-size: 24px;
        color: #126BA5;
    }

    div{
        height: 40px;
        width: 40px;
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

    p{
        font-size: 18px;
        color: #666666;
    }
`;

const CreateHabit = styled.form`
    height: 180px;
    width: 100%;
    border-radius: 5px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #ffffff;
    position: relative;

    input{
        height: 45px;
        width: 99%;
        margin-bottom: 2%;
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
        height: 35px;
        width: 45%;
        border-radius: 5px;
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
    right: 4%;
    bottom: 5%;
`;

const Cancel = styled.div`
    height: 100%;
    width: 45%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #52B6FF; 
`;

const UserHabits = styled.div`
    height: 15vh;
    width: 100%;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #ffffff;
    position: relative;
    margin-bottom: 4%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    ion-icon{
        height: 22px;
        width: 20px;
        position: absolute;
        top: 12%;
        right: 3%;
    }
`;

const HabitName = styled.div`
    height: 50%;
    font-size: 20px;
    color: #666666;
`;
const Days = styled.div`
    height: 30%;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    ${(props) => props.disablePointer?  "pointer-events: none;" : undefined };

    div{
        height: 32px;
        width: 32px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 15px;
        color: #DBDBDB;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;