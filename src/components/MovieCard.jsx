import React from 'react';

function MovieCard({movie, poster, name, handleList, handleRemove, list}) {

    function inList(movie){
        for(let i = 0; i<list.length; i++){
            if(list[i].id == movie.id){
                return true;
            }
        }

        return false;
    }
    return (
        <div className='relative m-2 bg-cover w-[150px] h-[30vh] bg-center hover:cursor-pointer hover:scale-125 rounded-lg duration-300 hover:z-10' style={{backgroundImage: `url(http://image.tmdb.org/t/p/original/${poster})`}}>
            
            {inList(movie) ? (
                <div onClick={() => handleRemove(movie)} className='hover:scale-150 w-[15px] m-1 duration-100'>
                    &#10060;
                </div>
            ): (
                <div onClick={() => handleList(movie)} className='hover:scale-150 w-[15px] m-1 duration-100'>
                    &#128525;
                </div>
            )}


            <div className='absolute opacity-85 w-full bottom-0 bg-gray-400 text-l text-center text-white rounded'>
                {name}
            </div>
        </div>
    );
}

export default MovieCard;