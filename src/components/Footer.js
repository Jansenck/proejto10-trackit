import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components";

export default function Footer(){

    const percentage = 0;



    return(
        <Menu>
            <Habits>Hábitos</Habits>
                <div style={{ width: 90, height: 90 , paddingBottom: "5vh"}}>
                    <CircularProgressbar
                        value={percentage}
                        text={"Hoje"}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })}
                    />
                </div>
            <History>Histórico</History>
        </Menu>
    );
}

const Menu = styled.div`
    height: 12vh;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 18px;
    }
`;



const Habits = styled.div`
    width: 35%;
    color: #52B6FF;
`;

const History = styled.div`
    width: 35%;
    color: #52B6FF;
`;


