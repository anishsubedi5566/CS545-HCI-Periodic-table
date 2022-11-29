import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useDataLayerValue } from "../context-api/DataLayer";
import { actionTypes } from "../context-api/reducer";
import { onAuthStateChanged } from "firebase/auth";
import { Auth, AppUserLogout, ChangePassword } from "../Firebase";
import { Modal, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import SearchElements from "./SearchElements";
const auth = Auth();

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuCloseClass, setMenuCloseClass] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [{ periodicSearch }, dispatch] = useDataLayerValue();

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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  async function changePassword() {
    if (password === "" || confirmPassword === "" || oldPassword === "") {
      toast.error("Please fill all the fields");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      let data = { oldPassword, password };
      await ChangePassword(data).then((res) => {
        console.log("res", res);

        setChangePasswordModal(false);
        setOpen(false);
      });
    }
  }

  const handleMenuState = () => {
    if (periodicSearch === "hidebx") {
      setMenuCloseClass("menu-tapped");
      setOpenSearchModal(true); // open search modal
      dispatch({
        type: actionTypes.SEARCH_UI_TOGGLE,
        periodicSearch: "",
      });
    } else {
      setOpenSearchModal(false); // close search modal
      dispatch({
        type: actionTypes.SEARCH_UI_TOGGLE,
        periodicSearch: "hidebx",
      });
    }
  };

  return (
    <div className="navbar">
      <div
        onClick={handleMenuState}
        className={`navbar-item navbar-menu ${menuCloseClass}`}
      >
        <div className="middle"></div>
      </div>
      <div className="navbar-name">
        <Link className="home-link" to="/">
          Periodic Table
        </Link>
      </div>

      {user ? (
        <div className="nav-right">
          <Avatar
            name={user.displayName}
            size="40"
            round={true}
            onClick={() => setOpen(true)}
          />

          <div>
            {changePasswordModal === true ? (
              <Modal open={open === true} onClose={() => setOpen(false)}>
                <div className="modal-change">
                  <div className="modal-title">
                    <h1>Change password </h1>
                  </div>
                  <div className="modal-body">
                    <TextField
                      label="Old Password"
                      type="password"
                      variant="outlined"
                      sx={{ width: "60%", marginBottom: "2rem" }}
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                    />

                    <TextField
                      label="New Password"
                      type="password"
                      variant="outlined"
                      sx={{ width: "60%", marginBottom: "2rem" }}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />

                    <TextField
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      sx={{ width: "60%", marginBottom: "2rem" }}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />

                    <h4>
                      <Link onClick={changePassword} className="link-logout">
                        Submit
                      </Link>
                    </h4>
                  </div>
                </div>
              </Modal>
            ) : (
              <Modal open={open === true} onClose={() => setOpen(false)}>
                <div className="modal">
                  <div className="modal-title">
                    <h1>Welcome, {user.displayName} </h1>
                  </div>
                  <div className="modal-body">
                    <h4>
                      <Link
                        to="/quiz"
                        className="link"
                        onClick={() => setOpen(false)}
                      >
                        Go to Quiz
                      </Link>
                    </h4>
                    <h4>
                      <Link
                        to="/favourites"
                        className="link"
                        onClick={() => setOpen(false)}
                      >
                        Check Favourites
                      </Link>
                    </h4>
                    <h4>
                      <Link
                        className="link"
                        onClick={() => setChangePasswordModal(true)}
                      >
                        Change Password
                      </Link>
                    </h4>
                    <h4>
                      <Link onClick={handleLogout} className="link-logout">
                        Logout
                      </Link>
                    </h4>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      ) : (
        <div className="nav-right">
          <h4>
            <Link to="/login" className="link-login">
              Login
            </Link>
          </h4>
        </div>
      )}
      <SearchElements
        func={setMenuCloseClass}
        searchModalVal={openSearchModal}
        searchModalFunc={setOpenSearchModal}
      />
    </div>
  );
};

export default NavBar;
