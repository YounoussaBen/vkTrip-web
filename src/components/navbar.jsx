import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from 'react-icons/md'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useState } from "react";
import logo from "../assets/images/logo.png"
import Signup from "../components/signup"
import Signin from "../components/signin"
import { toast } from "react-toastify";


const Navbar = () => {
  const location = useLocation();
  const[toggle, setToggle] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleClose = () => {
    console.log('close modal')
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
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
        
        <div className="items-center">
          <div className="">
          <button className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => setIsRegisterOpen(true)}>Sign up</button>
          { isRegisterOpen && ( 
                    <Signup 
                    openAnotherModal={handleOpenLoginAgain}
                    onClose={handleClose}
                    />
                    )}

          { isLoginOpen && ( 
                    <Signin 
                    openAnotherModal={handleOpenRegisterAgain}
                    onClose={handleClose}
                    />
                    )}
          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;