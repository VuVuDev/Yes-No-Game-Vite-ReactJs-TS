import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { TiDelete } from "react-icons/ti";

interface IPros {
    gameData: any
    setClick: any
    displayModel: any
    setGameData: any
    inputRef: any
}
function ListNamePlayer({gameData, setClick, displayModel, setGameData, inputRef}:IPros) {

    const handleAddNewPlayer = () => {
        setClick(false)
        inputRef.current?.focus()        
    }
    const deletePlayer = (index:number) => {
        let MinusPlayer = gameData.filter((value:object, id:number) => id!==index)
        setGameData([...MinusPlayer]);
    }
    return (
        <div className={`${displayModel} flex flex-col items-center mt-[20px] w-fit bg-slate-100 rounded-md p-4`}>
        <table>
            <tbody>
                <tr className=''>
                    <th className='border-2 w-[160px]'>No.</th>
                    <th className='border-2 w-[160px]'>Player</th>
                </tr>
                {
                    gameData.map((items:any, index:any) => (
                        <tr key={index}>
                            <td className='border-2 text-center w-[100px] relative'>{index + 1} 
                                <span className='absolute top-[3px] right-5'>
                                    <TiDelete className='cursor-pointer hover:text-red-600 transition text-[18px]'
                                        onClick={() => deletePlayer(index)}
                                    ></TiDelete>
                                </span>
                            </td>
                            <td className='border-2 w-[100px] text-center'>{items.name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div className='mt-[10px]'>
            <button className='bg-slate-500 text-white mt-[10px] rounded-md px-4 py-2 w-[320px] hover:bg-slate-600 transition font-bold' onClick={() => handleAddNewPlayer()}>Add more player</button>
        </div>
    </div>
    )
}

export default ListNamePlayer
