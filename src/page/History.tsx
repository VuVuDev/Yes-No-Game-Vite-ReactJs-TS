import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface Ipros {
    gameHistory: any
    setGameHisotry: any
}

function History({gameHistory, setGameHisotry}:Ipros) {
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
            width: 80,
        },
        {
            field: 'totalCorrect',
            headerName: "Score",
            type: 'number',
            width: 120,
            align: "center"
        },
        {
            field: 'persentCorrect',
            headerName: "Persent Correct (%)",
            align: 'center',
            width:160
        },
        {
            field: 'status',
            headerName: "Status",
            width: 120
        },
        {
            field: 'createAt',
            headerName: "Create at time",
            width: 180
        }
      ];
      
      const handleDeleteAllHistory = () => {
            setGameHisotry([])
      }
      const handleDeleteHistory = (index:number) => {
        let MinusHistory = gameHistory.filter((value:object, id:number) => id!==index)
        setGameHisotry([...MinusHistory])
      }

    return (
        <div className='flex w-screen flex-col h-screen items-center pt-[50px]'>
            <div className=''>
                <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>
            </div>
            <div className='flex items-center flex-col mt-[10px] pb-[50px]'>
               <h1 className='mb-[10px] font-bold'>TOTAL OF GAMES: {
                gameHistory.length
               }</h1>
               <div className='w-[240px] flex flex-row  justify-between'>
                    <button className='px-4 py-2 bg-slate-100 rounded-md font-bold cursor-pointer hover:bg-red-500 hover:text-white transition'
                        onClick={() => handleDeleteAllHistory()}
                    >Delete All</button>
                    <button className='px-4 py-2 bg-slate-100 rounded-md font-bold cursor-pointer hover:bg-green-500 hover:text-white transition'
                    >Go Home</button>
               </div>
                {
                    gameHistory.map((data: any, index: number) => {
                        return (
                            <div className='' key={index}>
                                <div className='relative sm:h-[255px] h-[250px] sm:w-[820px] w-[360px] mt-[20px] bg-slate-100 rounded-md sm:p-[20px] p-[10px]'>
                                    <button className='absolute sm:bottom-[31px] sm:left-[30px] bottom-[21px] left-[20px] px-2 py-2 bg-slate-300 rounded z-10'
                                        onClick={() => handleDeleteHistory(index)}
                                    ><FaTrashAlt className = "text-slate-600"></FaTrashAlt></button>
                                    <DataGrid
                                        rows={data.newGameData}
                                        columns={columns}
                                        autoPageSize
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default History
