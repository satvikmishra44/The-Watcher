import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination';

function Movies({handleList, handleRemove, list}) {

    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    
    useEffect(() =>{
        
        const fetch = async () => {

            try{
                const url = search?`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${search}&page=${page}`
                : `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`

                const res = await axios.get(url);
                setMovie(res.data.results);
            } catch(error){
                console.log("Error Fetching Movies")
            }
        }

        fetch();
        
    }, [page, search])

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }


    const increment = () => {
        setPage(page+1);
    };

    const decrement = () => {
        if(page==1){
           console.log("Page Not Available") 
        }
        else{
            setPage(page-1);
        }
    };
    return (
        <div className='p-5'>

            <div class='max-w-md mx-auto'>
                <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div class="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                    class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id='movies'
                    value={search}
                    onChange={handleSearch}
                    placeholder="Looking for something...?" /> 
                </div>
            </div>

            <div className='text-2xl m-5 text-center font-bold'>
                Currently Trending
            </div>

            <div className=' flex flex-row flex-wrap justify-around'>
                {movie.map((movieObj)=>{
                    return <MovieCard list={list} key={movieObj.id} movie={movieObj} poster={movieObj.poster_path} name={movieObj.title} handleList={handleList} handleRemove={handleRemove}/>
                })}
            </div>

            <Pagination page={page} increment={increment} decrement={decrement}/>
        </div>
    );
}

export default Movies;