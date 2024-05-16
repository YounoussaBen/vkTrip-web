import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { useState } from "react";
import logo from "../assets/images/logo.png";

const AuthNavbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const loactionPath = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const handleSignOut = () => {
    // Perform any sign out actions here if needed
    // Then reload the window
    // window.location.reload();
  };

  return (
    <>
      <nav className="relative flex flex-row items-center justify-between w-full px-10 py-10">
        <div className="flex items-center justify-center gap-3">
          <div className="relative flex items-center md:hidden">
            {toggle ? (
              <MdOutlineClose
                // src={close}
                alt="close"
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(false)}
              />
            ) : (
              <BiMenuAltLeft
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(true)}
              />
            )}
            {toggle && (
              <ul className="absolute w-full  z-10 h-fit bg-[#FFFFFF] shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start  scaleUp">
                <Link to="/my-flights">
                  <button
                    className="bg-[#605DEC] w-36 py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
                    // onClick={handleSignOut}
                  >
                    My flights
                  </button>
                </Link>

                <Link to="/logout">
                  <button
                    className="bg-[#605DEC] w-36 py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
                    // onClick={handleSignOut}
                  >
                    Profile
                  </button>
                </Link>
                <Link to="/logout">
                  <button
                    className="bg-[#605DEC] w-36 py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
                    onClick={handleSignOut}
                  >
                    Log Out
                  </button>
                </Link>

              </ul>
            )}
          </div>
          <Link
            to="/"
            className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${
              loactionPath("/") && "text-[#605DEC]"
            }`}
          >
            <img
              src={logo}
              alt="Logo"
              className="md:w-[200px] md:h-[80px] w-[100px] h-[100px] object-contain"
            />
          </Link>
        </div>

        <div className="items-center hidden gap-5 md:flex">
          <Link to="/my-flights">
            <button
              className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
              // onClick={handleSignOut}
            >
              My flights
            </button>
          </Link>

          <Link to="/logout">
            <button
              className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AuthNavbar;
