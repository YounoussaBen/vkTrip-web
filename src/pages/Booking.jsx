import { Link } from "react-router-dom";
import { bag } from "../assets/images";
import { useState, useMemo } from "react";
import { PriceDetails } from "../container";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 
import countryList from 'react-select-country-list'
import Select from 'react-select'

const Booking = () => {
  const navigate = useNavigate();
  const [sameAsPassenger, setSameAsPassenger] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  
  const [nationality, setNationality] = useState("");
  const countries = useMemo(() => countryList().getData(), [])

  const [gender, setGender] = useState("");
  const genders =  [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" }
  ];
  const [emergencyFullName, setEmergencyFullName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");

  const handleCheckboxChange = (e) => {
    setSameAsPassenger(e.target.checked);

    if (e.target.checked) {
      setEmergencyFullName(firstName);
      setEmergencyPhoneNumber(phoneNumber);
      setEmergencyEmail(email);
    } else {
      setEmergencyFullName("");
      setEmergencyEmail("");
      setEmergencyPhoneNumber("");
    }
  };
  const [isBooking, setIsBooking] = useState(false);
  const [bagPrice, setBagPrice] = useState(0);
  const [numOfBag, setNumOfBag] = useState({
    numbag: 1,
  });

  const handleBagNumber = (name, oparetion) => {
    setNumOfBag((prev) => {
      return {
        ...prev,
        [name]: oparetion === "i" ? numOfBag[name] + 1 : numOfBag[name] - 1,
      };
    });
  };

const passengerData = {
  FirstName: firstName,
  LastName: lastName,
  MiddleName: middleName,
  EmailAddress: email,
  DateOfBirth: dateOfBirth,
  PhoneNumber: phoneNumber,
  Gender: gender,
  Nationality: nationality
}

 const isFormValid = () => {
  return firstName && lastName && email && phoneNumber;
};

  return (
    <>
      <div className="mb-28 flex flex-col items-start justify-between w-full h-full gap-10 px-8 mt-20 lg:flex-row">
        <div className="w-full lg:w-[682px] flex flex-col items-start gap-10">
          <div className="flex flex-col items-start w-full gap-2">
            <h1 className="titleh1">
              Passenger information
            </h1>
            <p className="text-[#7C8DB0] text-base font-normal">
              Enter the required information for each traveler and be sure that
              it exactly matches the government-issued ID presented at the
              airport.
            </p>
          </div>
          <div className="flex flex-col items-start w-full gap-4">
            <h2 className="text-[#6E7491] text-lg font-medium">
              Passenger Information
            </h2>
            <form className="flex flex-col items-center justify-start w-full gap-4 md:flex-row">
              <input
                type="text"
                placeholder="First Name*"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Middle Name"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                onChange={(e)=> setMiddleName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name*"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 md:flex-row">
            <div className="w-full md:w-1/3 relative">
                <input
                  type="date"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <span className="absolute left-28 top-3.5 text-[#7C8DB0] pointer-events-none">
                  Date Of Birth*
                </span>
              </div>
              <div className="w-full md:w-1/3 relative">
                <Select
                  placeholder="Nationality*"
                  className=" w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  options={countries}
                  value={nationality}
                  onChange={(nationality) => setNationality(nationality)}
                />
              </div>
              <div className="w-full md:w-1/3 relative">
                <Select
                  placeholder="Select Gender*"
                  value= {gender}
                  options={genders}
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  onChange={(gender) => setGender(gender)}
                 />
              </div>
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
            <div className="w-full md:w-1/2 relative">
              <input
                type="email"
                placeholder="Email Adress*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 relative">
              <PhoneInput
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={phoneNumber}
                onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />
            </div>
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 md:flex-row">
            </form>
          </div>
          <div className="flex flex-col items-start w-full gap-4">
            <h2 className="text-[#6E7491] text-lg font-medium">
              Emergency contact information
            </h2>
            <div className="flex items-center justify-start gap-2 mt-2">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={sameAsPassenger}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox" className="text-[#6E7491] font-normal">
                Same as Passenger
              </label>
            </div>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-4 md:flex-row">
              <input
                type="text"
                placeholder="Full Name*"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? firstName + " " + lastName : emergencyFullName}
                onChange={(e) => setEmergencyFullName(e.target.value)}
              />
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
            <div className="w-full md:w-1/2 relative">
              <input
                type="email"
                placeholder="Email Adress*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? email : emergencyEmail}
                onChange={(e) => setEmergencyEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 relative">
              <PhoneInput
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? phoneNumber : emergencyPhoneNumber}
                onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
              />
            </div>
            </form>
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <h1 className="titleh1">
              Bag information
            </h1>
            <p className="text-[#7C8DB0] text-base font-normal">
              Each passenger is allowed one free carry-on bag and one personal
              item. First checked bag for each passenger is also free. Second
              bag check fees are waived for loyalty program members.
            </p>
          </div>
          <div className="w-full sm:w-[400px] flex items-start justify-between gap-10">
            <div className="flex flex-col items-start gap-2">
              <p className="text-[#7C8DB0] text-base font-semibold">
                Passenger 
              </p>
              <p className="text-[#6E7491] text-base font-semibold">
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[#7C8DB0] text-base font-semibold">
                Checked bags
              </p>
              <div className="flex items-center gap-4 ">
                <button
                  className="text-[#605DEC] text-3xl font-semibold cursor-pointer disabled:cursor-not-allowed"
                  onClick={() => handleBagNumber("numbag", "d")}
                  disabled={numOfBag.numbag <= 0}
                >
                  -
                </button>
                <span className="text-[#6E7491] text-base font-semibold">
                  {numOfBag.numbag}
                </span>
                <button
                  className="text-[#605DEC] text-xl font-semibold cursor-pointer "
                  onClick={() => handleBagNumber("numbag", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full sm:w-[400px] justify-between flex-col">
          <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
            <PriceDetails
            totalprice={bagPrice}
            // totalprice={parseFloat(flights[index].base_price) + 121}
            />
            <Link
             to="/payment" 
             onClick={() => {
              if (isFormValid()) {
                  console.log('The passenger info are', firstName, middleName, lastName, dateOfBirth, passportNumber, email, phoneNumber);
                bookMyFlight();
                setIsBooking(true);
                toast.success('Success')
              } else {
                console.log('The passenger info are', firstName, middleName, lastName, dateOfBirth, passportNumber, email, phoneNumber);
                toast.error('Please fill all the fields before booking.')
              }
            }}



             className="mt-5">
              <button 
              disabled={!isFormValid()}
              className="py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200">
               {isBooking?(
                'Booking...'
               ):(
                'Book flight and Proceed to payment'
               )}
               
              </button>
            </Link>
          </div>     
        <div className="flex justify-center mt-10 sm:justify-center">
          <img
            src={bag}
            alt="bag"
            className="w-80 h-[420px] md:w-full md:h-full object-contain"
          />
        </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
