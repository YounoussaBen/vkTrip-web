import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from 'react-icons/md'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useState } from "react";
import logo from "../assets/images/logo.png"
import Signup from "../components/signup"

const Navbar = () => {
  const location = useLocation();
  const[toggle, setToggle] = useState(false);
  const [signup, setSignup] = useState(false);

  const loactionPath = (route) => {
    if(route === location.pathname) {
     return true
    }
   }

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between px-10 py-10 relative">

        <div className="flex items-center justify-center gap-3">
          
       <div className="relative md:hidden flex items-center">
       {toggle ? (
          <MdOutlineClose src={close} alt="close" className="w-7 h-7 text-[#605DEC] cursor-pointer" onClick={() => setToggle(false)}/>
          ) : (
            <BiMenuAltLeft className="w-7 h-7 text-[#605DEC] cursor-pointer" onClick={() => setToggle(true)}/>
          )}
        { toggle && (
            <ul className="absolute w-32 z-10 h-fit bg-[#FFFFFF] shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start p-4 scaleUp">
                <Link
              to="/"
              className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${loactionPath("/") && "text-[#605DEC]"}`}
            >
              <li>My Flights</li>
            </Link>
            </ul>
        )}
        </div>
           <Link
              to="/"
              className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${loactionPath("/") && "text-[#605DEC]"}`}
            >
          <img
            src={logo}
            alt="Logo"
            className="md:w-[200px] md:h-[80px] w-[100px] h-[100px] object-contain"
          />
            </Link>
        </div>
        
         <div className="">
          <button className="block md:hidden bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => setSignup(!signup)}>Sign up</button>
         { signup && ( 
          <Signup signup={signup} setSignup={setSignup}/>
          )}
          </div>

        {/* Desktop View */}

        <div className="hidden md:flex items-center space-x-8">
          <ul className="hidden md:flex items-center space-x-8 text-[#7C8DB0]">
            <Link
              to="/"
              className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${loactionPath("/") && "text-[#605DEC]"}`}
            >
              <li>My Flights</li>
            </Link>
          </ul>
          <div className="">
          <button className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => setSignup(!signup)}>Sign up</button>
         { signup && ( 
          <Signup signup={signup} setSignup={setSignup}/>
          )}
          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;