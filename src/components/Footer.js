import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContexts from "../contexts/UserContexts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components";

export default function Footer(){

    const {progress} = useContext(UserContexts);

    return(
        <Menu>
            <Link to="/habits" style={{width: "35%", color: "#52B6FF"}}>
                Hábitos
            </Link>
                <Link to="/today" style={{ width: 90, height: 90 , paddingBottom: "5vh"}}>
                    <CircularProgressbar
                        value={progress}
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
                </Link >
            <Link to="/history" style={{width: "35%", color: "#52B6FF"}}>
                Histórico
            </Link>
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


    a{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 18px;
        text-decoration: none;
    }
`;

