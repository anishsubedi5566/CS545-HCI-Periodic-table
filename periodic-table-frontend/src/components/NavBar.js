import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavBar = () => {
    return(
        <div className="navbar">
            <div className="navbar-item navbar-name">
                <Link className="home-link" to="/">Periodic Table</Link>
            </div>
            <div className="quiz-link">
                <Link className="navbar-name" to='/periodic-table/quiz'>Take a quiz</Link>
            </div>
        </div>
    )
}

export default NavBar;