import React from 'react'
import {useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { Pagination } from '@mui/material';

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
    gameData: Player['newPlayer'][];
    setGameData: React.Dispatch<React.SetStateAction<Player['newPlayer'][]>>;
    setGameHistory: React.Dispatch<React.SetStateAction<object[]>>;
    gameHistory: object[];
}

function Summary({gameData, setGameHistory, gameHistory}:Ipros) {
    
    const [search, setSearch] = useState<boolean>(false);
    const [searchList, setSearchList] = useState<object[]>([]);
    const navigate = useNavigate();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        let searchWord:string = event.target.value;
        setSearch(true);
        let newGameData = gameData.filter((value:Player['newPlayer'], index:number) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setSearchList([...newGameData]);
    }

    const gotoHome = ():void => {
        navigate("/")
        const newGameHistory = gameHistory.map((data:object, index: number) => {
            return data;
        })
        setGameHistory([...newGameHistory.reverse()]);
    }   

    let hiddenTable = search ? "" : "hidden";
    let appearTable = search ? "hidden" : "";

    const columns: GridColDef[] = [
        {
            field: "id", 
            headerName: "ID", 
            width: 85,
            align: "center"
        }, 
        {
            field: 'name',
            headerName: "Name",
            width: 140,
        },
        {
            field: 'createAt',
            headerName: "Date",
            type: 'string',
            width: 200,
        },
        {
            field: 'chosen',
            headerName:'Answers',
            type: 'object',
            sortable: false,
            width: 220,
        },
        {
            field: 'result',
            headerName: 'Results',
            sortable: false,
            type: 'object',
            width: 220
        },
        {
            field: 'totalCorrect',
            headerName: "Score",
            type: 'number',
            width: 120,
            align: "center"
            
        }
      ];
      
      const columnsSummary: GridColDef[] = [
        {
            field: "name",
            headerName: "Summary",
            align:'center',
            width: 180
        },
        {
            field: 'persentCorrect',
            headerName: "Correct Percent (%)",
            align: 'center',
            width: 180
        }, 
        {
            field: 'totalCorrect',
            headerName: "Total Score",
            align: 'center',
            width: 110
        }
      ];
    return (
        <div className='flex w-screen flex-col h-fit items-center pt-[50px] pb-[20px]'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>
                <h2>Final Result</h2>
            </div>
            <div className='flex flex-col h-[120px] sm:flex-row items-center justify-between mt-[20px] w-[360px] sm:w-[720px]'>
                <h1 className='font-bold'>Winner: {
                    gameData.map((value:any, index:any) => {
                        if(value.status === "Winner") {
                            return (
                                <span className={`${value.color} mr-2`} key={index}>{value.name}</span>
                            )
                        }
                    })
                }</h1>
                <h3>Search: <input type="text" onChange={(e) => handleSearch(e)} placeholder='Player Name' className='ml-2 border-2 border-slate-500 rounded px-2'/></h3>
                <h1 className='font-bold bg-green-400 text-white px-4 py-2 rounded-md select-none cursor-pointer hover:bg-green-500 transition'
                    onClick={() => gotoHome()}
                >Go to Home</h1>
            </div>
            <div className={`sm:h-[215px] h-[215px] mt-[20px] w-[360px] sm:w-[1000px] bg-slate-100 ${appearTable}`}>
                <DataGrid
                    rows={gameData}
                    columns={columns}
                    autoPageSize
                />
            </div>
            <div className={`sm:h-[215px] h-[215px] mt-[20px] w-[360px] sm:w-[1000px] bg-slate-100 ${hiddenTable}`}>
                <DataGrid
                    rows={searchList}
                    columns={columns}
                    autoPageSize
                />
            </div>
            <div className={`sm:h-[214.5px] h-[215px] mt-[20px] w-[360px] sm:w-[480px] bg-slate-100`}>
                <DataGrid
                    rows={gameData}
                    columns={columnsSummary}
                    autoPageSize
                />
            </div>
        </div>
    )
}

export default Summary
