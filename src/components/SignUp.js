import { Link } from "react-router-dom";

import styled from "styled-components";

import logo from "../assets/bigLogo.png";

export default function SignUp(){
    return(
        <>
            <Container>
                <Logo>
                    <img src={logo} alt={logo}/>
                </Logo>
                <Form>
                    <input type="text" placeholder="email"/>
                    <input type="password" placeholder="senha"/>
                    <input type="text" placeholder="nome"/>
                    <input type="text" placeholder="foto"/>
                    <Link to="/" style={{height: "17%", width: "100%"}}>
                        <button type="submit">Cadastrar</button>
                    </Link>
                </Form>
                <Link to="/" style={{fontSize: "14px", color:"#52B6FF", position: "absolute", top: "90%"}}>
                    <p>Não tem uma conta? Cadastre-se!</p>
                </Link>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10%;
    box-sizing: border-box;
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
            height: 100%;
            width: 100%;
            font-size: 21px;
            background-color:#52B6FF;
            color: #ffffff;
            border-radius: 5px;
        }
`;