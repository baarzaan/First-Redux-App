import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

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
        <header
          className="w-full h-12 flex justify-between items-center px-2 shadow-md"
          style={{ zIndex: 999 }}
        >
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setOpenNav(!openNav)}
              className="sm:hidden flex"
            >
              {openNav ? <CgClose size={25} /> : <BiMenu size={25} />}
            </button>

            <Link to="/">
              <h1 className="text-3xl font-bold">LOGO</h1>
            </Link>
          </div>

          <nav className="sm:flex hidden">
            <ul className="flex justify-center items-center gap-10">
              <li className="transfom transition-all ease-in-out duration-300 hover:text-[#969393] active:scale-95">
                <Link to="/">Home</Link>
              </li>

              <li className="transfom transition-all ease-in-out duration-300 hover:text-[#969393] active:scale-95">
                <Link to="/create">Create blog</Link>
              </li>
            </ul>
          </nav>

          {openNav && (
            <nav className="sm:hidden flex" style={{ zIndex: 999 }}>
              <ul className="absolute top-12 left-0 w-full p-2 bg-white flex flex-col justify-center items-center gap-5">
                <li className="transfom transition-all ease-in-out duration-300 hover:text-[#969393] active:scale-95">
                  <Link to="/" onClick={() => setOpenNav(false)}>
                    Home
                  </Link>
                </li>

                <li className="transfom transition-all ease-in-out duration-300 hover:text-[#969393] active:scale-95">
                  <Link to="/create" onClick={() => setOpenNav(false)}>
                    Create blog
                  </Link>
                </li>
              </ul>
            </nav>
          )}

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
