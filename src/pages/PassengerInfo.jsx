import { Link } from "react-router-dom";
import { bag } from "../assets/images";
import { useState } from "react";
import { PriceDetails } from "../container";
// import { bookFlight, sendPassenger } from "../data/_registration_api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PassengerInfo = () => {
  const navigate = useNavigate();
  const [sameAsPassenger, setSameAsPassenger] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportExpirationDate, setPassportExpirationDate] = useState("");

  const [emergencyFirstName, setEmergencyFirstName] = useState("");
  const [emergencyLastName, setEmergencyLastName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");

  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setSameAsPassenger(e.target.checked);

    if (e.target.checked) {
      setEmergencyFirstName(firstName);
      setEmergencyLastName(lastName);
      setEmergencyPhoneNumber(phoneNumber);
      setEmergencyEmail(email);
    } else {
      setEmergencyFirstName("");
      setEmergencyLastName("");
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

  const index = JSON.parse(localStorage.getItem("flights_selected_index"));
  console.log("The index of flight on passenger info is ", index);
  const flights = JSON.parse(localStorage.getItem("flights"));
  // console.log("the flights details on the page is", flights[index]);

const passengerData = {
  FirstName: firstName,
  LastName: lastName,
  MiddleName: middleName,
  EmailAddress: email,
  DateOfBirth: dateOfBirth,
  PhoneNumber: phoneNumber,
  PassportNumber: passportNumber,
  PassportExpiration: passportExpirationDate,
  PassportCountry: nationality
}




//   const bookMyFlight = async (e) => {
//     // e.preventDefault();
//     // console.log('The departure for round trip is', flightdata['departure'])
//     // console.log('The arrival round trip is', flightdata['arrival'])
//     // console.log('The date round trip is', flightdata['date'])
//     // console.log('The date is', format(date[0].startDate, "yyyy-MM-dd"))
//     const passengerResponse = await sendPassenger(passengerData);
//     console.log('The reponse on Passenger inf0 page is', passengerResponse)

//     const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
//     console.log('The current flight that i want is', currentFlight)

//     const bookingData={
//       "trip_type": currentFlight.flight_type,
//       "total_price":'20000',
//       "checked_bags":3,
//       "passengers":[
//         passengerResponse.data.id
//       ],
//       "flights":[
//         flights[index].id
//       ]
//     }
//        const  response = await bookFlight(bookingData);
//        console.log("The booking data on Signin.tsx is ", response.data);
//        localStorage.setItem('booking_data', JSON.stringify(response.data));
//        const bookData = JSON.parse(localStorage.getItem("booking_data"))
//        console.log('The booking data in storage',bookData)

//        navigate('/payment') 
//  }

 const isFormValid = () => {
  return firstName && lastName && dateOfBirth && passportNumber && email && phoneNumber;
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
                placeholder="Middle Name*"
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
            <div className="w-full md:w-1/3">
                <p className=" text-[10px]">Nationality</p>
              <input
                type="text"
                placeholder="Nationality"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                onChange={(e)=> setNationality(e.target.value)}
              />
              </div>
             <div className="w-full md:w-1/3">
             <p className=" text-[10px]">Passport Number</p>
             <input
                type="text"
                placeholder="Passport Number"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                onChange={(e)=> setPassportNumber(e.target.value)}
              />
             </div>

              <div className="w-full md:w-1/3">
                <p className=" text-[10px]">Passport Expiration date</p>
              <input
                type="date"
                placeholder="Passport Expiration date"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-1 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                onChange={(e)=> setPassportExpirationDate(e.target.value)}
              />
              </div>
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
            <div className="w-full">
              <p className=" text-[10px]">Date of birth</p>
              <input
                type="date"
                placeholder="Date of birth*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-3 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              </div>
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
              <input
                type="email"
                placeholder="Email Adress*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 md:flex-row">
              {/* <input
                type="text"
                placeholder="Address"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                onClick={(e)=> setAddress(e.target.value)}
              /> */}
              {/* <input
                type="text"
                placeholder="Known traveller number"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
              /> */}
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
                placeholder="First Name*"
                className=" w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? firstName : emergencyFirstName}
                onChange={(e) => setEmergencyFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? lastName : emergencyLastName}
                onChange={(e) => setEmergencyLastName(e.target.value)}
              />
            </form>
            <form className="flex flex-col items-center justify-start w-full gap-4 mt-2 md:flex-row">
              <input
                type="email"
                placeholder="Email Adress*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? email : emergencyEmail}
                onChange={(e) => setEmergencyEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number*"
                className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] placeholder:text-[#7C8DB0] rounded"
                value={sameAsPassenger ? phoneNumber : emergencyPhoneNumber}
                onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
              />
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
              {/* ${flights[index]?.checked_bag_price}   */}
              jello
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
          {/* <div className="flex items-center gap-5">
            <button className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
              Save & close
            </button>
            <Link to="/seat-selection">
              <button className="hidden lg:block py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200">
                Select seats
              </button>
            </Link>
          </div> */}
        </div>

        <div className="w-full h-full sm:w-[400px] justify-between flex-col">
          <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
            <PriceDetails
            totalprice={bagPrice}
            // totalprice={parseFloat(flights[index].base_price) + 121}
            // The price here
            />
            <Link
            //  to="/payment" 
            onClick={() => {
              {
                console.log('The passenger info are', firstName,middleName, lastName, dateOfBirth, passportNumber, email, phoneNumber)
                setIsBooking(true)
                console.log('Booking is clicked', );
                // bookMyFlight();
              }
            }}

            // onClick={() => {
            //   if (isFormValid()) {
            //       console.log('The passenger info are', firstName, middleName, lastName, dateOfBirth, passportNumber, email, phoneNumber);
            //     bookMyFlight();
            //     setIsBooking(true);
            //     toast.success('Success')
            //   } else {
            //     console.log('The passenger info are', firstName, middleName, lastName, dateOfBirth, passportNumber, email, phoneNumber);
            //     toast.error('Please fill all the fields before booking.')
            //   }
            // }}


             className="mt-5">
              <button 
              // disabled={!isFormValid()}
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

export default PassengerInfo;
