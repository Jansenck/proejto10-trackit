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
        
        promise.catch(error => { 
            const {message} = error.response.data;
            setLoading(false);
            setDisableForm("");
            window.alert(message);
        })
    }

    return(
        <>
            <Container disabled={disableForm}>
                <div>
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
                    <Link to="/" style={{fontSize: "14px", color:"#52B6FF", marginTop: "5vh"}}>
                        <p>Não tem uma conta? Cadastre-se!</p>
                    </Link>
                </div>
                
            </Container>
        </>
    );
}

const Container = styled.fieldset`
    height: 100vh;
    width: 100%;
    background-color: #FFFFFF;

    div:nth-child(1){
        
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 5%;
        box-sizing: border-box;
    }
`;

const Logo = styled.div`
    height: 182px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: space-between;
    margin: 10% 5%;
    box-sizing: border-box;

`;

const Form = styled.form`
    height: 284px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

        input{
            height: 46px;
            width: 98%;
            font-size: 20px;
            color: #666666;
            border: 1px solid #d5d5d5;
            border-radius: 5px;
        }
        input::placeholder{
            color: #d4d4d4;
        }

        button{
            height: 50px;
            width: 100%;
            font-size: 21px;
            background-color:#52B6FF;
            color: #ffffff;
            border-radius: 5px;
        }
`;