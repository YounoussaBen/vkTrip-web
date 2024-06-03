import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";  // Import useEffect
import { PriceDetails } from "../container";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import countryList from "react-select-country-list";
import api from "../api";
import "react-phone-number-input/style.css";

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
  const [isBooking, setIsBooking] = useState(false);
  const [numOfBag, setNumOfBag] = useState(1); // Initialize checked bags to 1

  useEffect(() => {
    // Save data to localStorage whenever necessary data changes
    localStorage.setItem("num_of_bag", numOfBag);  
  }, [numOfBag]);

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

  const handleBagNumberChange = (operation) => {
    setNumOfBag((prev) => (operation === "i" ? prev + 1 : Math.max(1, prev - 1)));
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

  const bookMyFlight = async () => {
    try {
      toast.success("Booking your flight...");
      const passengerResponse = await api.post("/passenger/", passengerData);
      const passengerId = passengerResponse.data.id;

      const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
      const index = JSON.parse(localStorage.getItem("flights_selected_index"));
      const flights = JSON.parse(localStorage.getItem("flights"));
      const selectedFlight = flights.results[index];

      let bookingData;
      if (currentFlight.flight_type === "Round Trip") {
        const outboundFlightPrice = parseFloat(selectedFlight.outbound_flight.base_price);
        const returnFlightPrice = parseFloat(selectedFlight.return_flight.base_price);
        const totalPrice = (outboundFlightPrice + returnFlightPrice).toFixed(2);

        bookingData = {
          trip_type: currentFlight.flight_type,
          total_price: totalPrice.toString(),
          checked_bags: numOfBag,
          passengers: [passengerId],
          flights: [selectedFlight.outbound_flight.id, selectedFlight.return_flight.id],
        };
      } else {
        const price = selectedFlight.base_price;
        bookingData = {
          trip_type: currentFlight.flight_type,
          total_price: price.toString(),
          checked_bags: numOfBag,
          passengers: [passengerId],
          flights: [selectedFlight.id],
        };
      }

      const response = await api.post("/booking/", bookingData);
      localStorage.setItem("booking_data", JSON.stringify(response.data));
      setIsBooking(false);
      navigate("/payment");
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    }
  };

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      dateOfBirth &&
      email &&
      phoneNumber &&
      gender &&
      nationality
    );
  };

  const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
  const index = JSON.parse(localStorage.getItem("flights_selected_index"));
 	const flights = JSON.parse(localStorage.getItem("flights"));
	const selectedFlight = flights.results[index];

  // Determine the bag price
  let bagPrice = 0;
  if (currentFlight.flight_type === "Round Trip") {
    bagPrice =
      parseFloat(selectedFlight.outbound_flight.checked_bag_price) +
      parseFloat(selectedFlight.return_flight.checked_bag_price);
  } else {
    bagPrice = parseFloat(selectedFlight.checked_bag_price);
  }

  const flightClass = selectedFlight?.flight_class || "Economic";
  const freeBags = flightClass === "Business" ? 2 : 1;
  const additionalBags = Math.max(0, numOfBag - freeBags);
  const totalBagPrice = additionalBags * bagPrice;

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
                <span className="absolute w-26 left-10 right-0 text-left lg:left-2 lg:right-28 top-[-10px] bg-white psx-1 text-sm text-[#7C8DB0] pointer-events-none">  {/* Corrected typo */}
                  Date Of Birth*
                </span>
                <input
                  type="date"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="relative w-full md:w-1/3">
                <Select
                  placeholder="Nationality*"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
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
                  placeholder="Email Address*"
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
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
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
                  placeholder="Email Address*"
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                  value={sameAsPassenger ? email : emergencyEmail}
                  onChange={(e) => setEmergencyEmail(e.target.value)}
                />
              </div>
              <div className="relative w-full md:w-1/2">
                <PhoneInput
                  className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
				  value={sameAsPassenger ? phoneNumber : emergencyPhoneNumber}
				  onChange={(emergencyPhoneNumber) => setEmergencyPhoneNumber(emergencyPhoneNumber)} // Corrected the onChange function
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col items-start w-full gap-4 mt-6">
            <h2 className="text-[#6E7491] text-lg font-medium">
              Checked Bags
            </h2>
            <div className="flex items-center justify-start gap-4">
              <button 
                type="button" 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleBagNumberChange("d")}
              >
                -
              </button>
              <span className="text-lg">{numOfBag}</span>
              <button 
                type="button" 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleBagNumberChange("i")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[400px] flex flex-col items-center gap-10 mt-10">
          <PriceDetails
            totalBagPrice={totalBagPrice.toFixed(2)}
            numOfBag={numOfBag}
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
            className="mt-5 w-full"
          >
            <button
              className="py-2 px-4 w-full border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
            >
              {isBooking ? "Booking..." : "Book flight and Proceed to payment"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Booking;
