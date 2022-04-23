import { React, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import logo from "../images/logo.png";

export default function Navbar() {
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    //  console.log(location.pathname);
  }, [location]);

  const handlelogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"sticky",top:"0"}}>
        <div className="container-fluid">
          <img style={{width:"70px",height:"70px",cursor:"pointer"}} src={logo} alt=""/>
          <Link style={{pointerEvents:location.pathname==='/Home'?"none":""}} className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" style={{margin:"10px",fontSize:"18px"}}>
                <Link
                  className={`nav-link ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                  style={{pointerEvents:location.pathname==='/' || location.pathname==='/About' ?"none":"" }}
                  aria-current="page"
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item" style={{margin:"10px",fontSize:"18px"}}>
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {location.pathname==='/Home' && (
              <form className="d-flex">
                <button
                onClick={handlelogout}
                className="btn btn-primary mx-1"
                role="button"
                >
                Logout
              </button>
             </form>
            )}
            {/* {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button
                onClick={handlelogout}
                className="btn btn-primary mx-1"
                role="button"
              >
                Logout
              </button>
            )} */}
          </div>
        </div>
      </nav>
    </div>
  );
}
