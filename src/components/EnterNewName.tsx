import React from 'react'

interface Ipros {
    inputRef: any
    handleOnChange: any
    handleSetPlayer: any
    setPlayer: any
    inputText: any
    hiddenModel: any
    setClick: any
}

function EnterNewName({inputRef, handleOnChange, handleSetPlayer, setPlayer,inputText, hiddenModel, setClick}:Ipros) {
    const handleSetPlayerOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            handleSetPlayer()
        }
    }
    return (
        <div className={`flex flex-col items-center mt-[20px] w-fit bg-slate-100 rounded-md p-4 ${hiddenModel}`}>
            <h2 className='font-bold'>Create Your New Game</h2>
            <div className='flex flex-col-reverse items-center mt-[10px] mb-[10px]'>
                <input ref={inputRef} value={inputText} type="text" placeholder='Enter name' className='pl-2 outline-none border-2 rounded-md w-[320px]' 
                onChange={(e) => handleOnChange(e)} 
                onKeyDown={handleSetPlayerOnKeyDown}
                />
                <span className='text-sm'>New name</span>
            </div>
            <div className='flex flex-row justify-evenly w-[100%]'>
                <button className='border-2 w-24 hover:bg-slate-50 transition' onClick={() => handleSetPlayer()}>Oke</button>
                <button className='border-2 w-24 hover:bg-slate-50 transition' onClick={() => setClick(true)}>Cancel</button>
            </div>
        </div>
    )
}

export default EnterNewName
