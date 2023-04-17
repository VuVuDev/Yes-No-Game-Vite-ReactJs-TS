import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import AnswerOption from '../components/AnswerOption';

interface Ipros {
    gameData: any
    totalRound: any
    setGameData: any
    loading: any
    setLoading: any,
    setResult: any
}

function SubmitAnswer({gameData, totalRound, setGameData, loading, setLoading, setResult}:Ipros) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [answerArray, setAnswerArray] = useState<string[]>(Array.from({ length: gameData[0]?.rounds }, () => "Empty"))
    const navigate = useNavigate() 

    const fetchData = async () => {
        setLoading(true)
        setResult(Array.from({length : gameData[0].rounds}, () => "Empty"))
        try {
         const responses = await Promise.all(
            Array.from({length: gameData[0]?.rounds}, () => axios.get('https://yesno.wtf/api'))
         )
         const data = responses.map((responses => responses.data.answer.toUpperCase()))
         handleSetPlayerResult(data)
         setResult(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitButtonClick = () => {
        
        if(currentIndex < gameData.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setPlayerColor()
            setAnswerArray(Array.from({ length: gameData[0]?.rounds }, () => "Empty"))
        }
        if(currentIndex == gameData.length - 1) {
            navigate("/result-game")
            setPlayerColor()
            fetchData()
        }
    }    
    const textColor = [
        "text-green-500",
        "text-red-500",
        "text-blue-500",
        "text-amber-600",
        "text-violet-500"
    ]
    const randomColor = textColor[Math.floor(Math.random() * textColor.length)]
    const setPlayerColor = () => {
        let newGameData = gameData.map((value:any, index:number) => {
            if(index === currentIndex) {
                let rColor = randomColor
                value.color = rColor
            }
            return {
                ...value
            }
        })
        setGameData([...newGameData])
    }

    const handleSetPlayerAnswer = ((answerIndex:number, answerValue:string) => {
        let newList = [...answerArray]
        if(answerArray[answerIndex] === answerValue) {
            newList[answerIndex] = "Empty";
            setAnswerArray(newList)
        } else {
            newList[answerIndex] = answerValue
            setAnswerArray(newList)
        }

        const newGamData = gameData.map((value:any, index:number) => {
            if(index === currentIndex) {
                value.chosen = newList
            }
            return {
                ...value
            }
        })
        setGameData([...newGamData])
    })

    const handleSetPlayerResult = ((data:any) => {               
        let newGameData = gameData.map((value:any, index:number) => {
            value.result = data
            let count = 0
            value?.chosen?.map((answer:any, index:number) => {
                if(answer === data[index]) {
                    count++
                }
            })
            let newPersentCorrect = Math.round((count*100/data.length))
            value.totalCorrect = count
            value.persentCorrect = newPersentCorrect
            return {
                ...value
            }
        })
        setGameData([...newGameData])
    })
    

    return (
        <div className='flex flex-col items-center pt-[50px]'>
            <div className=''>
                <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>
            </div>

            <AnswerOption 
                player = {gameData[currentIndex]}
                setGameData={setGameData}
                totalRound = {totalRound}
                handleSetPlayerAnswer = {handleSetPlayerAnswer}
            ></AnswerOption>

            <button className='mt-[20px] mb-[100px] bg-green-500 px-4 py-2 rounded-md text-white font-bold hover:bg-green-600 transition' 
                onClick={() => onSubmitButtonClick()}
            >Submit</button>
        </div>
    )
}

export default SubmitAnswer
