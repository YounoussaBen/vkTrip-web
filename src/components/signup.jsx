import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingIndicator from "./loadingIndicator";
import api from "../api"; // Import your api module
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


const SignupForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => (
  <form className="flex flex-col gap-4">
    <input
      type="email"
      placeholder="Email or Phone Number"
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
    <input 
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
    />
  </form>
);

const Signup = ({signup, setSignup, openAnotherModal, onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


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
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
  
    // Check if check1 is selected
    if (!check1) {
      toast.error('Please agree to the terms and conditions.');
      return;
    }
  
    setLoading(true); // Set loading to true while making the API call
    try {
      const response = await api.post('/account/user/register/', {
        email,
        password
      });
  
      // Handle successful signup here, e.g., show a success message, redirect user, etc.
      console.log('Signup successful:', response.data);
  
      // Sign in the user using the same credentials after successful sign up
      const signInResponse = await api.post('/auth/get-token/', {
        email,
        password
      });
  
      // Set access token and refresh token in local storage
      localStorage.setItem(ACCESS_TOKEN, signInResponse.data.access);
      localStorage.setItem(REFRESH_TOKEN, signInResponse.data.refresh);
      
      // Reload the page to reflect the signed-in state
      window.location.reload();
  
    } catch (error) {
      // Handle signup error here, e.g., show an error message to the user
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false after API call completes
      openAnotherModal();
    }
  };
  

  return (
    <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-[#FFFFFF] shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col  gap-6 scaleUp">
      <header className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h1 className="text-[#6E7491] text-[20px] sm:text-[24px] leading-5 sm:leading-8 font-bold ">
            Sign up for vkTrip
          </h1>
          <MdOutlineClose
            className="text-[#6E7491] cursor-pointer"
            onClick={() => onClose()}
          />
        </div>
        <p className=" text-sm sm:text-[18px] leading-4 sm:leading-6 text-[#7C8DB0] mt-2">
          vkTrip is totally free to use. Sign up using your email address below to get started.
        </p>
      </header>
      <SignupForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
      <div className="flex flex-col gap-2">
        <form className="flex items-center gap-2 ">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
            className="text-[#7C8DB0] outline-none"
          />
          <label htmlFor="checkbox" className="text-[#7C8DB0] text-sm sm:text-base">
            I agree to the{" "}
            <span className="text-[#605DEC]">terms and conditions</span>
          </label>
        </form>
        <form className="flex items-center gap-2 ">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
            className="text-[#7C8DB0] outline-none "
          />
          <label htmlFor="checkbox" className="text-[#7C8DB0] text-sm sm:text-base">
            Send me the latest deal alerts
          </label>
        </form>
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          className="w-full bg-[#605DEC] text-[#FAFAFA] rounded py-3 outline-none border-none"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </div>
      <div className="flex items-center justify-center"> 
      {loading && <LoadingIndicator />}
      </div>
      <div className="flex justify-center mt-2">
        <p className="text-[#7C8DB0]">
          Already have an account?{" "}
          <span
            className="text-[#605DEC] cursor-pointer"
            onClick={() => {
              openAnotherModal()
              }}
          >
            Sign in
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1 " />
        <p className="text-[#7C8DB0] text-[18px] leading-6">or</p>
        <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1" />
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
          onClick={() => setSignup(!signup)}
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

export default Signup;