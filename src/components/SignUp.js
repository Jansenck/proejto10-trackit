import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ThreeDots } from  'react-loader-spinner';

import styled from "styled-components";
import axios from "axios";

import logo from "../assets/bigLogo.png";

export default function SignUp(){

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [disableForm, setDisableForm] = useState("");

    const [registerData, setRegisterData] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    })

    function sendResgister(event){

        event.preventDefault();

        setLoading(true);
        setDisableForm("disabled")

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const body = registerData;
        
        const promise = axios.post(URL, body);

        promise.then(() => navigate("/"));
        
        promise.catch(res => {
            setLoading(false);
            setDisableForm("");
            window.alert("Algo deu errado, tente novamente.");
        })
    }

    return(
        <>
            <Container disabled={disableForm}>
                <Logo>
                    <img src={logo} alt={logo}/>
                </Logo>
                <Form onSubmit={sendResgister}>

                    <input type="text" placeholder="email" 
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}/>

                    <input type="password" placeholder="senha"
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}/>

                    <input type="text" placeholder="nome"
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}/>

                    <input type="text" placeholder="foto"
                        onChange={(e) => setRegisterData({...registerData, image: e.target.value})}/>


                        {loading?
                            <button 
                                style={{
                                    display: "flex", 
                                    justifyContent: "center", 
                                    alignItems: "center", 
                                    opacity: "0.7"
                                }}>

                               <ThreeDots 
                                    height="80" 
                                    width="80" 
                                    radius="9"
                                    color="#ffffff" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                /> 

                            </button>
                             :
                            <button type="submit" onClick={sendResgister}>Cadastrar</button>
                        }

                </Form>
                <Link to="/" style={{fontSize: "14px", color:"#52B6FF", position: "absolute", top: "90%"}}>
                    <p>Não tem uma conta? Cadastre-se!</p>
                </Link>
            </Container>
        </>
    );
}

const Container = styled.fieldset`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10%;
    box-sizing: border-box;
    background-color: #FFFFFF;
`;

const Logo = styled.div`
    height: 35%;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5%;

`;

const Form = styled.form`
    height: 44vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 40%;

        input{
            height: 16.5%;
            font-size: 20px;
            color: #666666;
            border: 1px solid #d5d5d5;
            border-radius: 5px;
            
        }
        input::placeholder{
            color: #d4d4d4;
        }

        button{
            height: 17%;
            width: 100%;
            font-size: 21px;
            background-color:#52B6FF;
            color: #ffffff;
            border-radius: 5px;
        }
`;