import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

export default function App() {

  const [list, setList] = useState([]);

  const handleList = (Movie) => {
    let newList = [...list, Movie];
    localStorage.setItem('watchlist', JSON.stringify(newList))
    setList(newList);
    console.log(newList);
  }

  let handleRemove = (Movie) =>{
    let filtered = list.filter((movietorem) => {
      return movietorem.id != Movie.id;
    })

    setList(filtered);

    localStorage.setItem("watchlist", JSON.stringify(filtered))
  }

  useEffect(()=>{
    const localList = localStorage.getItem('watchlist')

    if(!localList){
      return
    }
    setList(JSON.parse(localList))
  }, []);

  return(
    <div>
      <h1>
      <BrowserRouter>
        <NavBar/>

    
    <Routes>
        <Route path="/" element={<><Banner list={list[0]}/> <Movies list={list} handleRemove={handleRemove} handleList={handleList}/></>}/>
        <Route path="/list" element={<> <Watchlist list={list} setList={setList} handleRemove={handleRemove}/> </>}/>
        
    </Routes>
    </BrowserRouter>
      </h1>
    </div>
  )
}