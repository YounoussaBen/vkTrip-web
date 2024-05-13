import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import api from "../api"; // Import your api module
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./loadingIndicator";

const LoginForm = ({ email, setEmail, password, setPassword }) => (
  <form className="flex flex-col gap-4">
    <input
      type="email"
      placeholder="Email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
    />
  </form>
);

const Signin = ({ signin, setSignin, openAnotherModal, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Handle Google login logic
    toast.info("Google login feature coming soon!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email format is valid
    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    if (password.trim() == ''){
        toast.error("Please Enter Password")
        return;
      }

    setLoading(true); // Set loading to true while making the API call
    try {
      const res = await api.post('/auth/get-token/', { email, password });
      // Assuming your API returns tokens upon successful login
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      // Close signin form after successful login
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Set loading back to false after API call completes
    }
  };

  return (
    <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-[#FFFFFF] shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col gap-6 scaleUp">
      <header className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h1 className="text-[#6E7491] text-[20px] sm:text-[24px] leading-5 sm:leading-8 font-bold ">
            Sign in to vkTrip
          </h1>
          <MdOutlineClose
            className="text-[#6E7491] cursor-pointer"
            onClick={() => onClose()}
          />
        </div>
        <p className=" text-sm sm:text-[18px] leading-4 sm:leading-6 text-[#7C8DB0] mt-2">
          Sign in using your email address below.
        </p>
      </header>
      <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      <div className="flex items-center justify-center w-full">
        <button
          className="w-full bg-[#605DEC] text-[#FAFAFA] rounded py-3 outline-none border-none"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
      <div className="flex items-center justify-center"> 
      {loading && <LoadingIndicator />}
      </div>
      <div className="flex justify-center mt-2">
        <p className="text-[#7C8DB0]">
          Don't have an account?{" "}
          <span
            className="text-[#605DEC] cursor-pointer"
            onClick={() => {
              openAnotherModal()
                }
            }
            >
            Sign up
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="w-[18px] h-[18px]" />
          <p className="text-[#605CDE] text-[16px] leading-6">
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default Signin;