import React from 'react'
import {useState} from 'react'
import { RotateSpinner, WhisperSpinner } from 'react-spinners-kit';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router';

interface Ipros {
    gameData: any
    loading: any
    result: any
    setGameData: any
    setGameHistory: any
    gameHistory: any
}

function Result({gameData, loading, result, setGameData, setGameHistory, gameHistory}:Ipros) {
    let hiddenButton = loading ? "hidden" : ""
    let appearButton = loading ? "" : "hidden"
    console.log(loading);
    
    const navigate = useNavigate()
    const handleGotoSummary = () => {
        const maxPersentCorrect = gameData.reduce((max:any, player:any) => {
            return player?.persentCorrect > max ? player?.persentCorrect : max
        }, 0)
        let newGameData = gameData.map((value:any, index:any) => {
            if(value?.persentCorrect === maxPersentCorrect) {
                value.status = "Winner"  
            } else {
                value.status = "Loser"
            }
            return {
                ...value
            }
        })        
        setGameData([...newGameData])
        setGameHistory([
            ...gameHistory,
            {
                newGameData
            }
        ])
        navigate("/summary")
    }

    return (    
        <div className='flex w-screen flex-col h-screen items-center pt-[50px]'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>            

            </div>
            
            <h1 className='mt-[20px] flex flex-row justify-center gap-2 px-2 font-bold w-[320px]'>Player: {
                gameData.map((item:any, index:number) => (
                    <div className='' key={index}>
                        <p className={`mr-2 font-bold pointer-events-none ${item.color}`}>{index === gameData.length - 1 ? item.name.toUpperCase() : item.name.toUpperCase() + ","}</p>
                    </div>
                ))
            }</h1>

            <div className='w-[320px] sm:w-[1200px] flex flex-wrap gap-[20px] justify-center'>
                {
                    result.map((valueResult:string, index:any) => {
                        let checkEmpty = false
                        return (
                            (
                                <div className='' key={index}>
                                    <div className={`${appearButton} mt-[20px]`}>
                                        <h1>Round {index + 1}:</h1>
                                        <Skeleton variant='rounded' width={320} height={64} animation="wave"></Skeleton>
                                    </div>
        
                                    <div className={`${hiddenButton} mt-[20px]`}>
                                        <h1>Round {index + 1} :</h1>
                                        <div className='flex flex-row justify-between'>
                                            <div className={` bg-slate-200 w-[320px] font-bold py-2 rounded-md`}>
                                                <p className='ml-8'>Result: <span className={`${valueResult === "YES" ? "text-green-500" : "text-red-500"}`}>{valueResult}</span></p>
                                                <p className='ml-8'>Winner:
                                                    {   
                                                        gameData.map((playerValue:any, indexPlayer:number) => {
                                                            let playerName
                                                            if(playerValue?.chosen[index] === valueResult) {
                                                                playerName = playerValue?.name
                                                                checkEmpty = true
                                                                return (
                                                                    <span className={` ml-2 ${playerValue?.color}`}  key={indexPlayer}>{playerName}</span>
                                                                )
                                                            } 
                                                           
                                                        }) 
                                                    }
                                                    <span className='ml-2 font-normal'>{checkEmpty ? "" : "Empty"}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    })
                }
            </div>
            <div className='mt-[20px]'>
                <div className={`${appearButton} bg-slate-200 px-4 py-2 rouned-md font-bold flex flex-row rounded-md mb-[100px]`}>
                    <RotateSpinner size = {24} color="#000" loadind = {loading}></RotateSpinner>
                    <p className='ml-2'>Loading...</p>
                </div>
                <div className={`${hiddenButton} bg-green-400 px-4 py-2 rounded-md font-bold text-white text-center select-none cursor-pointer mb-[100px]`}
                    onClick={() => handleGotoSummary()}
                >Summary</div>
            </div>
        </div>
    )
}

export default Result
