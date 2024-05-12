import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { suggestions } from "../constants";
import departure from "../assets/icons/departure.png";
import arrival from "../assets/icons/arrival.png";
// import calendar from "../assets/icons/calendar.png";
import person from "../assets/icons/person.png";
import { format } from "date-fns";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AutoSuggest = (initialValue) => {
    const [input, setInput] = useState("");
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
  
    const handleSuggestionClick = (suggestion) => {
      setInput(suggestion);
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
function ExploreForm() {
    const departureSuggest = AutoSuggest("");
    const arrivalSuggest = AutoSuggest("");
    const [flightType, setflightType] = useState("One Way");
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
  return (
    <div className=" flex flex-col items-center relative w-full h-[529px] px-7 py-4 pt-10">
      <div className="flex flex-col justify-start items-start w-full max-w-[1024px] gap-5 lg:flex-row ">
        <div className="flex h-[65px] w-full lg:max-w-[170px] lg:h-[65px] lg:flex-row items-center flex-col  shadowCard relative rounded-lg justify-center">
          <select
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
          <select name="Flight Class" id="class">
            <option value="Economic">Economic</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
        <div className="flex h-[65px] w-full lg:max-w-[170px] lg:h-[65px] lg:flex-row items-center flex-col  shadowCard relative rounded-lg justify-center">
          <select name="Passenger Type" id="pType">
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
            placeholder="From where?"
            value={departureSuggest.input}
            onChange={departureSuggest.handleInputChange}
            onFocus={() => departureSuggest.setIsOpen(true)}
            className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
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

        <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
          <img src={arrival} alt="arrival" />
          <input
            type="text"
            placeholder="Where to?"
            value={arrivalSuggest.input}
            onChange={arrivalSuggest.handleInputChange}
            onFocus={() => arrivalSuggest.setIsOpen(true)}
            className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
          />
          {arrivalSuggest.isOpen && (
            <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
              {arrivalSuggest.matchingSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() =>
                    arrivalSuggest.handleSuggestionClick(suggestion)
                  }
                  className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE]  mt-1"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
          <div className="flex" onClick={() => setOpenDate(!openDate)}>
            {/* <img src={calendar} alt="calendar" width={20} height={20}/> */}
            <div>
              <p className="text-xs">Date</p>
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

          <div className="relative">
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

        <Link to="/explore" className="w-full ">
          <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5   lg:rounded-r-[4px]">
            Search
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ExploreForm;
