import React, { useEffect, useState } from 'react'
import { BiCheck } from "react-icons/bi";

interface IPros {
    totalRound: any
    player: any
    setGameData: any
    handleSetPlayerAnswer: any
}

function Option({totalRound, player, setGameData,handleSetPlayerAnswer}:IPros) {
    const rounds = []

    for(let i = 0; i < player?.rounds; i++) {
        let setGreenColor =  player.chosen[i] !== "YES" ? "text-green-500" : "bg-green-500 text-white"
        let setRedColor = player.chosen[i] !== "NO" ? "text-red-500" : "bg-red-500 text-white"
        rounds.push(
            <div className='w-[320px] mt-[20px] flex flex-col' key={i}>
                <h1>Round {i+1}:</h1>
                <div className='flex flex-row justify-between'>
                    <button className={` ${setGreenColor} border-2 border-black w-[156px]  font-bold flex flex-row items-center justify-center`}
                        onClick={() => handleSetPlayerAnswer(i, "YES")}
                    ><BiCheck className='text-[20px] pointer-events-none'></BiCheck>YES</button>
                    <button className={` ${setRedColor} border-2 border-black w-[156px] font-bold flex flex-row items-center justify-center`}
                        onClick={() => handleSetPlayerAnswer(i, "NO")}
                    ><BiCheck className='text-[20px] pointer-events-none'></BiCheck>NO</button>
                </div>
            </div>
        )
    }     
    return (
        <div className='w-[320px] flex flex-wrap gap-[20px] justify-center sm:w-[1200px]'>{rounds}</div>
    )
}

function AnswerOption({player, setGameData,totalRound, handleSetPlayerAnswer}:IPros) {
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
