import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

export default function History(){
    return(
        <>
            <Header/>
            <Container>
                <Section>
                    <p>Histórico</p>
                </Section>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Container>
            <Footer/>
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

    p{
        font-size: 18px;
        color: #666666;
    }
`; 

const Section = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    

    p{
        font-size: 23px;
        color: #126BA5;
    }
`;