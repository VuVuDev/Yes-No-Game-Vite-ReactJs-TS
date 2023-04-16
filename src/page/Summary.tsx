import React from 'react'
import {useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

function Summary({gameData, setGameData}) {
    
    const [search, setSearch] = useState<boolean>(false)
    const [searchList, setSearchList] = useState<object[]>([])
    const navigate = useNavigate()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        let searchWord:string = event.target.value
        setSearch(true)
        let newGameData = gameData.filter((value:any, index:number) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        })
        setSearchList([...newGameData])
    }

    const gotoHome = () => {
        navigate("/")
    }

    let hiddenTable = search ? "" : "hidden"
    let appearTable = search ? "hidden" : ""
    // const rows:any = []

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
            width: 180
        },
        {
            field: 'persentCorrect',
            headerName: "Correct Persent (%)",
            width: 180
        }, 
        {
            field: 'totalCorrect',
            headerName: "Total Score",
            align: 'center',
            width: 110
        }
      ]
    return (
        <div className='flex w-screen flex-col h-fit items-center pt-[50px] pb-[20px]'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[30px]'><span className='text-green-500 font-extrabold text-[30px]'>YES</span> - <span className='text-red-500 font-extrabold text-[30px]'>NO</span> <span className='text-[30px]'>Game</span></h1>
                <h2>Final Result</h2>
            </div>
            <div className='flex flex-col h-[120px] sm:flex-row items-center justify-between mt-[20px] w-[360px] sm:w-[720px]'>
                <h1 className='font-bold '>Winner: {
                    gameData.map((value:any, index:any) => {
                        if(value.status === "Winner") {
                            return (
                                <span className={`${value.color}`} key={index}>{value.name}</span>
                            )
                        }
                    })
                }</h1>
                <h3>Search: <input type="text" onChange={(e) => handleSearch(e)} placeholder='Player Name' className='ml-2 border-2 border-slate-500 rounded px-2'/></h3>
                <h1 className='font-bold bg-green-400 text-white px-4 py-2 rounded-md select-none cursor-pointer hover:bg-green-500 transition'
                    onClick={() => gotoHome()}
                >Go to Home</h1>
            </div>
            <div className={`h-[268px] mt-[20px] w-[360px] sm:w-[1000px] ${appearTable}`}>
                <DataGrid
                    rows={gameData}
                    columns={columns}
                    // pageSizeOptions={[5]}
                    autoPageSize
                />
            </div>
            <div className={`h-[268px] mt-[20px] w-[360px] sm:w-[1000px] ${hiddenTable}`}>
                <DataGrid
                    rows={searchList}
                    columns={columns}
                    // pageSizeOptions={[5]}
                    autoPageSize
                />
            </div>
            <div className={`h-[268px] mt-[20px] w-[360px] sm:w-[480px]`}>
                <DataGrid
                    rows={gameData}
                    columns={columnsSummary}
                    // pageSizeOptions={[5]}
                    autoPageSize
                />
            </div>
        </div>
    )
}

export default Summary
