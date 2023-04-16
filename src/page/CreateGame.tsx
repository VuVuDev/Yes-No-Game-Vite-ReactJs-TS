import React, { useState } from 'react'
import EnterNewName from '../components/EnterNewName';
import ListNamePlayer from '../components/ListNamePlayer';
import TotalOfRouned from '../components/TotalOfRouned';
function CreateGame({inputRef, handleOnChange, handleSetPlayer, displayModel,
    inputText, setPlayer, gameData, hiddenModel, setClick, setGameData, 
    handleSetTotalRound, totalRound}) {
    return (
        <div className='flex w-screen flex-col h-screen items-center pt-[50px]'>
        <div className='flex flex-col items-center'>
            <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>
            <p className='mt-[30px] flex flex-col items-center px-4'><span>👍 Trust your luck and choose the answer you believe will be correct.</span> <span> Play with your friends to see who is the luckier one 🤗</span></p>
        </div>

        <EnterNewName
            inputRef={inputRef}
            inputText = {inputText}
            hiddenModel = {hiddenModel}
            setClick = {setClick}
            handleOnChange={(e) => handleOnChange(e)}
            handleSetPlayer = {() => handleSetPlayer()}
            setPlayer = {() => setPlayer()}
        ></EnterNewName>
        <ListNamePlayer
            gameData = {gameData}
            setClick={setClick}
            displayModel ={displayModel}
            setGameData = {setGameData}
            inputRef={inputRef}
        ></ListNamePlayer>
        <TotalOfRouned
            displayModel = {displayModel}
            gameData = {gameData}
            handleSetTotalRound = {handleSetTotalRound}
            totalRound = {totalRound}
            setGameData={setGameData}
        ></TotalOfRouned>

    </div>
    )
}

export default CreateGame
