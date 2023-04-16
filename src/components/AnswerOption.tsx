import React, { useEffect, useState } from 'react'
import { BiCheck } from "react-icons/bi";

function Option({totalRound, player, setGameData,handleSetPlayerAnswer}) {
    const rounds = []
    
    for(let i = 0; i < player?.rounds; i++) {
        
        const [valueYES, setValueYES] = useState("YES")
        const [valueNO, setValueNO] = useState("NO")

        const handleClickYes = (index:number) => {
            setValueYES(valueYES === "Empty" ? "Empty" : "YES")
            setValueNO(valueNO => "NO")
            handleSetPlayerAnswer(index, valueYES)
            setValueYES(valueYES => "YES")
        }
        const handleClickNo = (index:number) => {
            setValueNO(valueNO === "NO" ? "Empty" : "NO")
            setValueYES(valueYES => "YES")
            handleSetPlayerAnswer(index, valueNO)
            setValueNO(valueNO => "NO")
        }
        let setGreenColor = player?.chosen[i] !== "YES" ? "text-green-500" : "bg-green-500 text-white"
        let setRedColor = player?.chosen[i] !== "NO" ? "text-red-500" : "bg-red-500 text-white"
        rounds.push(
            <div className='w-[320px] mt-[20px] flex flex-col' key={i}>
                <h1>Round {i+1}:</h1>
                <div className='flex flex-row justify-between'>
                    <button className={` ${setGreenColor} border-2 border-black w-[156px]  font-bold flex flex-row items-center justify-center`}
                        onClick={() => handleClickYes(i)}
                    ><BiCheck className='text-[20px] pointer-events-none'></BiCheck>YES</button>
                    <button className={` ${setRedColor} border-2 border-black w-[156px] font-bold flex flex-row items-center justify-center`}
                        onClick={() => handleClickNo(i)}
                    ><BiCheck className='text-[20px] pointer-events-none'></BiCheck>NO</button>
                </div>
            </div>
        )
    }     
    return (
        <div className='w-[320px] flex flex-wrap gap-[20px] justify-center sm:w-[1200px]'>{rounds}</div>
    )
}

function AnswerOption({player, setGameData,totalRound, handleSetPlayerAnswer}) {
    return (
        <div className='mt-[20px] flex flex-col items-center'>
            <h1 className='font-bold'>{player?.name}'s Turn</h1>
            <Option 
            totalRound={totalRound}
            player={player}
            setGameData={setGameData}
            handleSetPlayerAnswer = {handleSetPlayerAnswer}
            ></Option>
        </div>
    )
}

export default AnswerOption
