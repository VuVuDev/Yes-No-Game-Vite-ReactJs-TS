import { useState, useRef, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'

import './App.css'
import Home from './page/Home'
import CreateGame from './page/CreateGame'
import SubmitAnswer from './page/SubmitAnswer'
import Result from './page/Result'
import Summary from './page/Summary'
import History from './page/History'
import Particel from './components/Particel'

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

function App() {
  const [totalRound, setTotalRound] = useState<string>("");
  const [newPlayer, setNewPlayer] = useState<Player['newPlayer']>({
    id: 0,
    name: "",
    createAt: "",
    color: "",
    rounds: "",
    chosen: [],
    result: [],
    persentCorrect: 0,
    totalCorrect: 0,
    status: "",
  });
  const [gameData, setGameData] = useState<Player['newPlayer'][]>([]);
  const [gameHistory, setGameHistory] = useState<object[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);;
  const [click, setClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false) ;
  let hiddenModel = click ? "hidden" : "";
  let displayModel = click ? "" : "hidden";
  const currentTime = new Date().toLocaleString();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setNewPlayer({
      ...newPlayer,
      name: event.target.value,
      createAt: currentTime,
    })
  };
  const setPlayer = (): void => {
    setGameData([
      ...gameData, 
      newPlayer
    ]);
    setNewPlayer({
      ...newPlayer,
      name: ""
    });
    setClick(click => true);
  };
  
  const checkDuplicateName = ():boolean => {
    let bool = false;
    gameData.map((value:any,i:number) => {
      if(newPlayer.name.toLocaleLowerCase().includes(value.name.toLocaleLowerCase())) {
        alert("This name is already exist!");
        bool = true;
      }
    })
    return bool;
  };

  const handleSetPlayer = ():void => {
    if(newPlayer.name === "" || newPlayer.name.trimEnd() === "") {
      alert("Input is empty!");
      return;
    }
    const pattern = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;
    if(pattern.test(newPlayer.name)) {
      alert("Name does not contain special character!");
      return;
    }
    if(/\d+/.test(newPlayer.name)) {
      alert("Name does not contain number!");
      return;
    }

    if(checkDuplicateName() === true) {
      return;
    }
    if(newPlayer.name.split("").length > 15) {
      alert("Player name too long!");
      setNewPlayer({
        ...newPlayer,
        name: ""
      })
      return;
    }
    if(newPlayer.name.split(' ').length >= 2) {
      alert("Invalid Value!");
      return;
    }    
    setPlayer();
  };
  const handleSetTotalRound = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTotalRound(value);
  };
  
  useEffect(() => {
    const storedData = localStorage.getItem("gameData");
    if (storedData) {
      setGameData(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }, [gameData]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("gameHistory");
    if (storedHistory) {
      setGameHistory(JSON.parse(storedHistory));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);
    
  return (
   <>
    <Particel></Particel>
    <Routes>
      
      <Route path='/' element={
      <Home
        setClick = {setClick}
        setGameData = {setGameData}
        gameHistory={gameHistory}
        newPlayer={newPlayer}
        setNewPlayer={setNewPlayer}
      ></Home>}></Route>

      <Route path='create-game' element={
      <CreateGame
        inputRef={inputRef}
        inputText = {newPlayer.name}
        hiddenModel = {hiddenModel}
        displayModel = {displayModel}
        setClick = {setClick}
        gameData = {gameData}
        setGameData = {setGameData}
        handleSetTotalRound = {handleSetTotalRound}
        totalRound = {totalRound}
        handleOnChange={handleOnChange}
        handleSetPlayer={handleSetPlayer}
        setPlayer = {setPlayer}  
      ></CreateGame>}></Route>

      <Route path='/submit-answer' element={
      <SubmitAnswer
        gameData={gameData}
        setGameData={setGameData}
        setLoading={setLoading}
        setResult={setResult}
      ></SubmitAnswer>}></Route>

      <Route path='/result-game' element={
      <Result
        gameData = {gameData}
        loading={loading}
        result = {result}
        setGameData={setGameData}
        setGameHistory={setGameHistory}
        gameHistory={gameHistory}
      ></Result>}></Route>

      <Route path='/summary' element={
      <Summary
        gameData={gameData}
        setGameData={setGameData}
        setGameHistory={setGameHistory}
        gameHistory={gameHistory}
      ></Summary>}></Route>

      <Route path='/history' element={
      <History
        gameHistory={gameHistory}
        setGameHisotry = {setGameHistory}
      ></History>}></Route>
    </Routes>

   </>
  )
}

export default App
