import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

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
interface IPros {
    setClick: React.Dispatch<React.SetStateAction<boolean>>;
    setGameData: React.Dispatch<React.SetStateAction<Player['newPlayer'][]>>;
    gameHistory: object[];
    newPlayer: Player['newPlayer'];
    setNewPlayer: React.Dispatch<React.SetStateAction<Player['newPlayer']>>;
}

function Home({setClick, setGameData, gameHistory, newPlayer, setNewPlayer}:IPros) {
    const [startActive, setStartActive] = useState<boolean>(false);
    let started = startActive ? "bg-green-500" : "bg-gray-500";
    let activeAdd = startActive ? "" : "hidden";
    const navigate = useNavigate();
    const handleAddNewGame = ():void => {
        setGameData([]);
        setNewPlayer({
            ...newPlayer,
            name:""
        })
        navigate("/create-game");
        setClick(false);
    };
    return (
        <div className='flex w-screen flex-col h-screen items-center pt-[50px]'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>
                <p className='mt-[30px] flex flex-col items-center px-4'><span>👍 Trust your luck and choose the answer you believe will be correct.</span> <span> Play with your friends to see who is the luckier one 🤗</span></p>
            </div>
            <div className='flex flex-col items-center'>
                <button className={`${started} px-4 py-2 text-white font-bold rounded-md transition mt-[40px]`}
                onClick={() => setStartActive(startActive => !startActive)}
                >Start Game</button>
                <button className={`${activeAdd} bg-gray-500 text-white font-bold transition mt-[20px] px-4 py-2 rounded-md`}
                onClick={() => handleAddNewGame()}
                >Add player</button>
                <button className={`${gameHistory.length === 0 ? "hidden" : "bg-blue-500 hover:bg-blue-600 transition"}  px-4 py-2 text-white font-bold rounded-md transition mt-[20px]`}
                onClick={() => navigate("/history")}
                >View History</button>
            </div>
        </div>
    )
}

export default Home
