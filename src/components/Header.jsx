import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/forgot-password")
  ) {
    return null;
  }
  return (
    <>
      {user ? (
        <header className="w-full h-12 flex justify-between items-center px-2 shadow-md">
          <h1 className="text-3xl font-bold">LOGO</h1>

          <nav>
            <ul className="flex justify-center items-center gap-10">
              <li className="transfom transition-all ease-in-out duration-300 hover:text-[#969393] active:scale-95">
                <Link to="/">Home</Link>
              </li>

              <li className="transfom transition-all ease-in-out duration-300 hover:text-[#969393] active:scale-95">
                <Link to="/create">Create blog</Link>
              </li>
            </ul>
          </nav>

          <Link
            to="/profile"
            className="transfom transition-all ease-in-out duration-300 active:scale-95"
          >
            <img
              src={user.userImageURL}
              className="w-10 h-10 object-cover rounded-full"
              alt=""
            />
          </Link>
        </header>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Header;
