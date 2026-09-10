import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const categories = [
    ["Vintage", "vintage clothing"],
    ["Home", "home decor"],
    ["Books", "rare books"],
    ["Records", "vinyl records"],
    ["Cameras", "retro cameras"],
  ];

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">thriftU</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <Link className="link discover-link" to="/gigs">Discover</Link>
          {!currentUser?.isSeller && <Link className="link seller-link" to="/register">Sell on thriftU</Link>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myGigs">
                        My listings
                      </Link>
                      <Link className="link" to="/add">
                        Add a listing
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join thriftU</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            {categories.map(([label, query]) => (
              <Link className="link menuLink" key={label} to={`/gigs?search=${encodeURIComponent(query)}`}>{label}</Link>
            ))}
            <Link className="link menuLink scout-link" to="/gigs?search=curated+vintage">AI Scout</Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
