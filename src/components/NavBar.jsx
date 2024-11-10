import React from "react";
import Logo from '../logo.png'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex border-2 w-full h-[10vh] items-center justify-between">
      {/* Logo and Links */}
      <div className="flex items-center space-x-8">
        <img className="w-[50px] -rotate-12 hover:rotate-0 duration-100" src={Logo} alt="Logo" />
        <Link to="/" className="text-blue-400 hover:text-blue-800 duration-300 hover:underline">Movies</Link>
        <Link to="/list" className="text-blue-400 hover:text-blue-800 duration-100 hover:underline">Watchlist</Link>
      </div>

      {/* Right-Aligned Title */}
      <h1 className="text-xl sm:text-4xl md:text-5xl font-sans font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-right pr-8">
        THE WATCHER
      </h1>
    </div>

  )
}

export default NavBar;