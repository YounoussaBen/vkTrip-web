import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from 'react-icons/md'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useState } from "react";
import logo from "../assets/images/logo.png"
import Signup from "../components/signup"
import Signin from "../components/signin"

const Navbar = () => {
  const location = useLocation();
  const[toggle, setToggle] = useState(false);
  const [signup, setSignup] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);

  const handleClose = () => {
    console.log('close modal')
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    toast.success("Logged in successfully");
  };


  const handleOpenRegisterAgain = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleOpenLoginAgain = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleOpenRegister = (event) => {
    event.preventDefault();
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const loactionPath = (route) => {
    if(route === location.pathname) {
     return true
    }
   }

  return (
    <>
      <nav className="relative flex flex-row items-center justify-between w-full px-10 py-10">

        <div className="flex items-center justify-center gap-3">
          
       <div className="relative flex items-center md:hidden">
       {toggle ? (
          <MdOutlineClose 
          // src={close} 
          alt="close" className="w-7 h-7 text-[#605DEC] cursor-pointer" onClick={() => setToggle(false)}/>
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
          <button className="block md:hidden bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => handleOpenRegister()}>Sign up</button>
         {/* { isRegisterOpen && ( 
          <Signup 
          // signup={signup} setSignup={setSignup} onClose={handleClose}
          openAnotherModal={handleOpenLoginAgain}
          onClose={handleClose}
          />
          )} */}
         
          </div>

        {/* Desktop View */}

        <div className="items-center hidden space-x-8 md:flex">
          <ul className="hidden md:flex items-center space-x-8 text-[#7C8DB0]">
            <Link
              to="/"
              className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${loactionPath("/") && "text-[#605DEC]"}`}
            >
              <li>My Flights</li>
            </Link>
          </ul>
          <div className="">
          <button className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => setIsRegisterOpen(true)}>Sign up</button>
         {/* { signup && ( 
          <Signup signup={signup} setSignup={setSignup} onClose={handleClose}/>
          )} */}

{ isRegisterOpen && ( 
          <Signup 
          // signup={signup} setSignup={setSignup} onClose={handleClose}
          openAnotherModal={handleOpenLoginAgain}
          onClose={handleClose}
          />
          )}

{ isLoginOpen && ( 
          <Signin 
          openAnotherModal={handleOpenRegisterAgain}
          onClose={handleClose}
          // signup={signup} setSignup={setSignup} onClose={handleClose}
          />
          )}
          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;