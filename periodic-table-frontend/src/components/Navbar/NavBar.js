import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { onAuthStateChanged } from "firebase/auth";
import { Auth, AppUserLogout } from "../Firebase";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const auth = Auth();

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("userinnavbar", user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        setIsLoading(false);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    AppUserLogout();
    localStorage.removeItem("user");
    toast.info("Logged Out");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-item navbar-name">
        <Link className="home-link" to="/">
          Periodic Table
        </Link>
      </div>

      {user ? (
        <div className="nav-right">
          <Link className="nav-item" to="/quiz">
            <p> {user.displayName}</p>
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="nav-right">
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
