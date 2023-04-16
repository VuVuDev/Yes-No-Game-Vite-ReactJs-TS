import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import AnswerOption from '../components/AnswerOption';

function SubmitAnswer({gameData, totalRound, setGameData, loading, setLoading, setResult}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate() 
    const fetchData = async () => {
        setLoading(loading => true)
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
            setLoading(loading => false)
        }
    }

    const onSubmitButtonClick = () => {
        if(currentIndex < gameData.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setPlayerColor()
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
        let newGameData = gameData.map((value, index) => {
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
        let newGameData = gameData.map((value:any, index:number) => {
            if(index === currentIndex) {
                const newValue = answerValue
                value.chosen[answerIndex] = newValue
                console.log(currentIndex);
                console.log(value.chosen);
            }            
            return {
                ...value
            }
        })    
        setGameData([...newGameData])    
    })

    const handleSetPlayerResult = ((data:any) => {               
        let newGameData = gameData.map((value:any, index:number) => {
            value.result = data
            let count = 0
            value?.chosen?.map((answer, index) => {
                if(answer === data[index]) {
                    count++
                }
            })
            let newPersentCorret = Math.round((count*100/data.length))
            value.totalCorrect = count
            value.persentCorrect = newPersentCorret
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
