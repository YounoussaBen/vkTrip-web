import { Link } from "react-router-dom";
import { bag } from "../assets/images";
import { useState, useMemo } from "react";
import { PriceDetails } from "../container";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import DatePicker from 'react-date-picker';
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import Select from "react-select";
import api from "../api";

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
  const countries = useMemo(() => countryList().getData(), []);

  const [gender, setGender] = useState("");
  const genders = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
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
    Gender: gender.label,
    Nationality: nationality.label,
  };

  const bookMyFlight = async (e) => {
    toast.success("Booking your flight...");

    const passengerResponse = await api.post("/passenger/", passengerData);
    
    const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
    
    const index = JSON.parse(localStorage.getItem("flights_selected_index"))
    
    const flights = JSON.parse(localStorage.getItem("flights"));

    const bookingData = {
      trip_type: currentFlight.flight_type,
      total_price: [flights.results[index].base_price],
      checked_bags: 3,
      passengers: [passengerResponse.data.id],
      flights: [flights.results[index].id],
    };
    const response = await api.post("/booking/", bookingData);
    localStorage.setItem("booking_data", JSON.stringify(response.data));
    const bookData = JSON.parse(localStorage.getItem("booking_data"));
    setIsBooking(false);  
    navigate("/payment");
  };

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      dateOfBirth &&
      email &&
      email &&
      phoneNumber &&
      gender &&
      nationality
    );
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between w-full h-full gap-10 px-8 mt-20 mb-28 lg:flex-row">
        <div className="w-full lg:w-[682px] flex flex-col items-start gap-10">
          <div className="flex flex-col items-start w-full gap-2">
            <h1 className="titleh1">Passenger information</h1>
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
                onChange={(e) => setMiddleName(e.target.value)}
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
              <div className="relative w-full md:w-1/3">
              <span className="absolute w-26 left-10 right-0 text-left lg:left-2 lg:right-28 top-[-10px] bg-white psx-1 text-sm text-[#7C8DB0] pointer-events-none">
                  Date Of Birth*
                </span>
                <input
                placeholder="hs"
                  type="date"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                
              </div>
              <div className="relative w-full md:w-1/3">
                <Select
                  placeholder="Nationality*"
                  className=" w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  options={countries}
                  value={nationality}
                  onChange={(nationality) => setNationality(nationality)}
                />
              </div>
              <div className="relative w-full md:w-1/3">
                <Select
                  placeholder="Select Gender*"
                  value={gender}
                  options={genders}
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  onChange={(gender) => setGender(gender)}
                />
              </div>
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
              <div className="relative w-full md:w-1/2">
                <input
                  type="email"
                  placeholder="Email Adress*"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative w-full md:w-1/2">
                <PhoneInput
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  value={phoneNumber}
                  onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
              </div>
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 md:flex-row"></form>
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
                value={
                  sameAsPassenger
                    ? firstName + " " + lastName
                    : emergencyFullName
                }
                onChange={(e) => setEmergencyFullName(e.target.value)}
              />
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
              <div className="relative w-full md:w-1/2">
                <input
                  type="email"
                  placeholder="Email Adress*"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  value={sameAsPassenger ? email : emergencyEmail}
                  onChange={(e) => setEmergencyEmail(e.target.value)}
                />
              </div>
              <div className="relative w-full md:w-1/2">
                <PhoneInput
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  value={sameAsPassenger ? phoneNumber : emergencyPhoneNumber}
                  onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="w-full h-full sm:w-[400px] justify-between flex-col">
          <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
            <PriceDetails
            />
            <Link
              onClick={() => {
                if (isFormValid()) {
                  setIsBooking(true);
                  bookMyFlight();
                } else {
                  toast.error("Please fill all the fields before booking.");
                }
              }}
              className="mt-5"
            >
              <button
                className="py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
              >
                {isBooking
                  ? "Booking..."
                  : "Book flight and Proceed to payment"}
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
