import React, { useEffect, useState } from 'react';
import genres from '../genres';

function Watchlist({list, setList, handleRemove}){

    const [search, setSearch] = useState("");
    const [genlist, setgenlist] = useState(["All Genres"]);
    const [current, setCurrent] = useState("All Genres")

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    };

    const sortAsc = () => {
        let sorted = list.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average;
        })

        setList([...sorted])
    }

    const sortDesc = () => {
        let sorted = list.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average;
        })

        setList([...sorted])
    }

    const popAsc = () => {
        let sorted = list.sort((movieA, movieB) => {
            return movieA.popularity - movieB.popularity
        })

        setList([...sorted])
    }

    const popDesc = () => {
        let sorted = list.sort((movieA, movieB) => {
            return movieB.popularity - movieA.popularity
        })

        setList([...sorted]);
    }

    useEffect(() => {
        let temp = list.map((movie) => {
            return genres[movie.genre_ids[0]]
        })

        temp = new Set(temp)
        setgenlist(["All Genres", ...temp])
    }, [list]);

    const handleGen = (genre) =>{
        setCurrent(genre)
    }

    return (
        <div>

            <div className='flex justify-center flex-wrap m-4'>
                {genlist.map((genre)=>{
                    return <div onClick={() => handleGen(genre)} className={current==genre?'m-2 bg-blue-500 rounded-lg w-[100px] h-[50px] flex justify-center text-center items-center text-white cursor-pointer': "cursor-pointer m-2 bg-gray-400 rounded-lg w-[100px] h-[50px] flex justify-center text-center items-center text-white"}>{genre}</div>
                })}
            </div>

            <div className='flex justify-center my-4'>
                <input type="text" value={search} onChange={handleSearch} placeholder='Search Movies' className='h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none'/>
            </div>
            <div className='mt-8 overflow-hidden'>
                <table className='w-full text-center'>
                    <thead className='border border-solid rounded-lg text-gray-500'>
                        <tr className='bg-gray-200'>
                            <th>Name</th>
                            <th>
                                <div className='flex justify-center'>
                                <div onClick={sortAsc} className='p-2 cursor-pointer'><i class="fa-solid fa-arrow-up"></i></div>
                                <div className='p-2'>Ratings</div>
                                <div onClick={sortDesc} className='p-2 cursor-pointer'><i class="fa-solid fa-arrow-down"></i></div>
                                </div>
                            </th>
                            <th className='hidden sm:flex justify-center'>
                                <div onClick={popAsc} className='p-2 cursor-pointer'><i class="fa-solid fa-arrow-up"></i></div>
                                <div className='p-2'>Popularity</div>
                                <div onClick={popDesc} className='p-2 cursor-pointer'><i class="fa-solid fa-arrow-down"></i></div>
                            </th>
                            <th>Genre</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        {list.filter((movie) => {
                            if(current=="All Genres"){
                                return true
                            }
                            else{
                                return genres[movie.genre_ids[0]] == current;
                            }
                        }
                        ).filter((movie) => {
                            return movie.title.toLowerCase().includes(search.toLocaleLowerCase())
                        }).map((movie) => {
                            const poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
                            return (
                                <tr className='border-b-2'>
                                    <td className='flex items-center px-3 py-4'>
                                        <img className='h-[12vh]' src={poster}/>
                                        <h1 className='ml-2'>{movie.title}</h1>
                                    </td>
                                    <td>{movie.vote_average.toFixed(2)}</td>
                                    <td className='hidden sm:table-cell'>{movie.popularity.toFixed(2)}</td>
                                    <td>{genres[movie.genre_ids[0]]}</td>
                                    <td onClick={()=>handleRemove(movie)} className='cursor-pointer text-red-500 p-3'>Delete</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Watchlist;