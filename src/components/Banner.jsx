import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Banner({list}) {
    const [banner, setBanner] = useState("url(https://w0.peakpx.com/wallpaper/34/966/HD-wallpaper-the-avengers-avengers-endgame-avengers-avengers-endgame.jpg)");
    const [title, setTitle] = useState("Avengers Endgame")
    
    const api_key = import.meta.env.VITE_TMDB_API_KEY;
    
    useEffect(()=> {
        if(list){
            axios.get(`https://api.themoviedb.org/3/movie/${list.id}/recommendations?api_key=${api_key}&language=en-US&page=1`).then(function(res){
                const recom = res.data.results[0]
                if(recom){
                    setBanner(`url(http://image.tmdb.org/t/p/original/${recom.poster_path})`)
                    setTitle(recom.title)
                }
                else{
                    setBanner("url(https://w0.peakpx.com/wallpaper/34/966/HD-wallpaper-the-avengers-avengers-endgame-avengers-avengers-endgame.jpg)")
                    setTitle("Avengers Endgame")
                }
            })
        }
        else{
            setBanner("url(https://w0.peakpx.com/wallpaper/34/966/HD-wallpaper-the-avengers-avengers-endgame-avengers-avengers-endgame.jpg)")
            setTitle("Avengers Endgame")
        }

    }, [list])
    
    
    
    return (
        <div className='h-[50vh] w-[100vw] bg-cover bg-center flex items-end relative' style={{backgroundImage: banner}}>
            <div className='absolute top-0 left-0 w-full text-center bg-gray-600 text-white opacity-90'>Recommendation For Your Watchlist</div>
            <div className='text-white bg-gray-600 w-full text-center opacity-90 text-xl'>{title}</div>
        </div>
    );
}

export default Banner;