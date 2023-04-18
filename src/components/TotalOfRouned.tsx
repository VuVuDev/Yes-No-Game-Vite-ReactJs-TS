import React from 'react'
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useNavigate} from 'react-router';

interface Player {
    newPlayer: {
    id: number;
    name: string;
    createAt: string;
    color: string;
    rounds: string;
    chosen: string[];
    result: string[];
    persentCorrect: number;
    totalCorrect: number;
    status: string;
    }
}
interface Ipros {
    displayModel: string;
    gameData: Player['newPlayer'][];
    handleSetTotalRound: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setGameData: React.Dispatch<React.SetStateAction<Player['newPlayer'][]>>;
    totalRound:string;
}
function TotalOfRouned({displayModel, gameData, handleSetTotalRound, totalRound, setGameData}:Ipros) {
    const navigate = useNavigate();
    
    const checkGameData = ():any => {
        if(gameData.length <= 1) {
            return true;
        } else if (totalRound === "") {
            return false;
        }
    }

    let cursorNotAllow = checkGameData() ? "cursor-not-allowed" : ""

    const tempArray:string[]  = []
    for (let i = 0; i < parseInt(totalRound); i++) {
        tempArray.push("Empty");
    }

    const setInfoPlayer = (totalRound:string, tempArray: string[]):void => {
    
       let newGameData = gameData.map((value:Player['newPlayer'], index:number) => { 
            value.id = index + 1;
            value.rounds = totalRound;
            value.chosen = tempArray;
            return {
                ...value
            }
       })
       setGameData([...newGameData]);
    }

    const handleStartGame = (): void => {
        if (checkGameData()  == true) {  
            alert("Doesn't have enough player to join the game");
            return;
        }
        if (totalRound === "" || totalRound.trimEnd() === "") {
            alert("You must enter total of round to start the game!");
            return;
        }
        if (parseInt(totalRound) <= 0) {
            alert("Number of round must greater than 0!");
            return;
        }
        const pattern = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;
        if (pattern.test(totalRound)) {
            alert("Total of round does not contain special character!");
            return;
        }
        if (parseInt(totalRound) >= 100) {
            alert("Total of round too large!");
            return;
        }
        if (isNaN(Number(totalRound))) {
            alert("Total of round must be a number!");
            return;
        } else {
            navigate("/submit-answer");
            setInfoPlayer(totalRound, tempArray);
            // console.log(gameData);
            
        }
    }
    const handleStartGameOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            handleStartGame();
        }
    }
    return (
        <div className={`${displayModel} mt-[20px] flex flex-col p-4 rounded-md bg-slate-100`}>
            <div className='flex flex-col-reverse w-[320px]'>
                <input type="text" className='border-2 outline-none pl-2' 
                onChange={(e) => handleSetTotalRound(e)}
                onKeyDown={(e) => handleStartGameOnKeyDown(e)}
                />
                <span className='text-sm'>Total round</span>
            </div>
            <div className='pt-2'>
            <button className={`${cursorNotAllow} bg-blue-500 text-white mt-[10px] rounded-md px-4 py-2 w-[320px] hover:bg-blue-600 transition font-bold`}
                onClick = {() => handleStartGame()}
            >Start game</button>
            </div>
        </div>
    )
}

export default TotalOfRouned
