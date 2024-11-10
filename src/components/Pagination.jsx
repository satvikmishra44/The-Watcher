import React from 'react';

function Pagination({increment, decrement, page}) {
    return (
        <div className='bg-gray-400 w-full text-xl flex justify-center items-center'>
            <div onClick={decrement}><i className="fa-solid fa-arrow-left hover:cursor-pointer" ></i></div>
            <h1 className='px-4'>{page}</h1>
            <div onClick={increment}><i className="fa-solid fa-arrow-right hover:cursor-pointer"></i></div>
        </div>
    );
}

export default Pagination