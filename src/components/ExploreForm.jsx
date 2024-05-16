import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { suggestions } from "../constants";
import departure from "../assets/icons/departure.png";
import arrival from "../assets/icons/arrival.png";
import calendar from "../assets/icons/calendar.png";
import { format } from "date-fns";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { toast } from "react-toastify";
import {api }from "../api"; // Import your api module
import { useNavigate } from "react-router-dom";


const AutoSuggest = ({initialValue}) => {
    const [input, setInput] = useState('');
    const [matchingSuggestions, setMatchingSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleInputChange = (event) => {
      const inputValue = event.target.value.toLowerCase();
      setInput(inputValue);
  
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue)
      );
      setMatchingSuggestions(filteredSuggestions);
    };
  
    const extractAirportName = (suggestion) => {
      return suggestion.split(",")[0].trim(); // Extracting only the airport name
    };
  
    const handleSuggestionClick = (suggestion) => {
      setInput(extractAirportName(suggestion)); // Set only the airport name
      setIsOpen(false);
    };
  
    return {
      input,
      matchingSuggestions,
      isOpen,
      setInput,
      setIsOpen,
      handleInputChange,
      handleSuggestionClick,
    };
  };

  
function ExploreForm({}) {
  const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
  console.log("Current Flight is: ", currentFlight);
  const navigate = useNavigate();
    const departureSuggest = AutoSuggest("");
    const arrivalSuggest = AutoSuggest("");
    const [flightType, setflightType] = useState("One Way");
    const [flightClass, setflightClass] = useState("Economic");
    const [passengerType, setpassengerType] = useState("Adult");
    const handleFlightTypeChange = (event) => {
      setflightType(event.target.value);
    };
  
    const [openDate, setOpenDate] = useState(false);
  
    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    const [isSeaching, setIsSearching] = useState(false);

    const flightdata = {
      "departure": departureSuggest.input.split(',')[0],
      "arrival": arrivalSuggest.input.split(',')[0],
      "flight_class": flightClass,
      "passenger_type": passengerType,
      "flight_type": flightType,
      "date": format(date[0].startDate, "yyyy-MM-dd"),
      
    };

     async function getOneWayFlight(data){
      // e.preventDefault();
      console.log('The departure is', flightdata.departure)
      console.log('The arrival is', flightdata['arrival'])
      console.log('The date is', flightdata['date'])
      console.log('The date is', format(date[0].startDate, "yyyy-MM-dd"))
         try {
          console.log('calling login api')
          const response = await api.get('/flight/one-way-search/', { params: {
            departure_location: data.departure,
            arrival_location: data.arrival,
            departure_time: data.date,
            flight_class: data.flight_class,
            passenger_type: data.passenger_type,
          },});
          console.log("The flights data on Signin.tsx is ", JSON.stringify(response?.data));
          localStorage.setItem('flights', JSON.stringify(response.data));
          setIsSearching(false)
          navigate('/explore')
        } catch (error) {
          console.error("Login failed:", error);
          toast.error("Login failed. Please check your credentials and try again.");
        } finally {
          setIsSearching(false)
        }
   }
  
    const getRoundFlight = async (e) => {
      // e.preventDefault();
      console.log('The departure for round trip is', flightdata['departure'])
      console.log('The arrival round trip is', flightdata['arrival'])
      console.log('The date round trip is', flightdata['date'])
      console.log('The date is', format(date[0].startDate, "yyyy-MM-dd"))
         const  response = await getRoundTripFlight(flightdata);
         console.log("The auth data on Signin.tsx is ", JSON.stringify(response?.data));
         localStorage.setItem('flights', JSON.stringify(response.data));
  
         const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
         console.log("The tokens in local storage is ", tokens);
         navigate('/explore') 
   }

   const isFormValid = () => {
    return departureSuggest && arrivalSuggest && flightClass && flightType && passengerType && date;
  };

  return (
    <div className=" flex flex-col items-center relative w-full h-[529px] px-7 py-4 pt-10">
      <div className="flex flex-col justify-start items-start w-full max-w-[1024px] gap-5 lg:flex-row ">
        <div className="flex h-[65px] w-full lg:max-w-[170px] lg:h-[65px] lg:flex-row items-center flex-col  shadowCard relative rounded-lg justify-center">
          <select
            className="bg-white"
            name="Flight Type"
            id="type"
            value={flightType}
            onChange={handleFlightTypeChange}
          >
            <option value="One Way">One way</option>
            <option value="Round Trip">Round Trip</option>
          </select>
        </div>
        <div className="flex h-[65px] w-full lg:max-w-[170px] lg:h-[65px] lg:flex-row items-center flex-col  shadowCard relative rounded-lg justify-center">
          <select className="bg-white" name="Flight Class" id="class"
          onChange={(e) => setflightClass(e.target.value)}
          >
            <option value="Economic">Economic</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div className="flex h-[65px] w-full lg:max-w-[170px] lg:h-[65px] lg:flex-row items-center flex-col  shadowCard relative rounded-lg justify-center">
          <select className="bg-white" name="Passenger Type" id="pType"
          onChange={(e) => setpassengerType(e.target.value)}
          >
            <option value="Adult">Adult</option>
            <option value="Minor">Minor</option>
          </select>
        </div>
      </div>

      <div className="flex w-full max-w-[1024px] lg:h-[65px] lg:flex-row items-center flex-col mt-10  shadowCard relative ">
        <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 lg:rounded-l-[4px] relative">
          <img src={departure} alt="departure" />
          <input
            type="text"
            placeholder= {'From where?'}
            value= {departureSuggest.input }
            // {departurefield? departurefield : departureSuggest.input}
            onChange={departureSuggest.handleInputChange}
            onFocus={() => departureSuggest.setIsOpen(true)}
            // onBlur={()=> departureSuggest.setIsOpen(false)}
            className={`uppercase placeholder:capitalize outline-none border-none ml-2 w-full text-xs text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-xs placeholder:leading-6 ${
              departureSuggest.input ? 'text-xs' : '' 
            }`}
          />
          {departureSuggest.isOpen && (
            <ul className="w-[220px] h-56 absolute top-[70px]  bg-white rounded overflow-scroll">
              {departureSuggest.matchingSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    departureSuggest.handleSuggestionClick(suggestion)
                  }
                  className="uppercase  cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE]  mt-1"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 lg:rounded-l-[4px] relative">
          <img src={arrival} alt="departure" />
          <input
            type="text"
            placeholder="From where?"
            value={arrivalSuggest.input}
            onChange={arrivalSuggest.handleInputChange}
            onFocus={() => arrivalSuggest.setIsOpen(true)}
            // onBlur={()=> arrivalSuggest.setIsOpen(false)}
            className={`uppercase placeholder:capitalize outline-none w-full border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-xs placeholder:leading-6 ${
              arrivalSuggest.input ? 'text-xs' : '' 
            }`}
          />
          {arrivalSuggest.isOpen && (
            <ul className="w-[220px] h-56 absolute top-[70px]  bg-white rounded overflow-scroll">
              {arrivalSuggest.matchingSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    arrivalSuggest.handleSuggestionClick(suggestion)
                  }
                  className="uppercase  cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE]  mt-1"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
          <div className="flex" onClick={() => setOpenDate(!openDate)}>
            <img src={calendar} alt="calendar" width={20} height={20}/>
            <div>
              <span className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer">
                {flightType === "One Way"
                  ? `${format(date[0].startDate, "dd/MM/yyyy")}`
                  : `${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                      date[0].endDate,
                      "dd/MM/yyyy"
                    )}`}
              </span>
            </div>
          </div>

          <div className=" absolute top-[0px]">
            {openDate &&
              (flightType === "One Way" ? (
                <Calendar
                  selected={date[0].startDate}
                  editableDateInputs={true}
                  onChange={(date) =>
                    setDate([
                      { startDate: date, endDate: date, key: "selection" },
                    ])
                  }
                  className="absolute z-10 top-64 lg:top-20"
                />
              ) : (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="absolute z-10 top-64 lg:top-20 "
                />
              ))}
          </div>
        </div>

        <Link 
         onClick={() => {
          {
            console.log('clicked heree')
            console.log('Passenger data on this page', flightdata);
            if(isFormValid()){
              setIsSearching(true)
            flightType === 'One Way' ? getOneWayFlight(flightdata) : getRoundFlight(flightdata)
            }else{
              console.log('The passenger info are', firstName, middleName, lastName, dateOfBirth, passportNumber, email, phoneNumber);
            toast.error('Please fill all the fields before booking.')
            }
            localStorage.setItem('currentFlight', JSON.stringify(flightdata));
          }
        }}
         className="w-full ">
          <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5   lg:rounded-r-[4px]">
          {isSeaching && isFormValid()?(
                "Searching..."
              ):(
                "Searching"
              )}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ExploreForm;
