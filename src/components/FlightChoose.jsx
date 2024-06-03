import { useState, useContext } from "react";
import { map } from "../assets/images";
import { RoundTripFlightCard, FlightCard, PriceDetails } from "../container";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../components/protectedRoute";
import Signin from "../components/signin";
import Signup from "../components/signup";
import { AUTH } from "../constants";

const FlightChoose = () => {
  const [priceShown, setPriceShow] = useState(true);
  const navigate = useNavigate();

  let flights = JSON.parse(localStorage.getItem("flights"));
  const cflights = JSON.parse(localStorage.getItem("currentFlight"));

  console.log(flights)
  const isAuthorized = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenLoginOrPage = () => {
    const authValue = localStorage.getItem(AUTH);
    if (authValue === "true") {
      navigate("/booking");
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleClose = () => {
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

  // Ensure flights is an array if the API returns a result count and results
  if (flights && flights.results) {
    flights = flights.results;
  }

  // Check if flights is an array
  const isFlightsArray = Array.isArray(flights);

  return (
    <>
      <div className="flex flex-col items-start justify-between lg:flex-row">
        <div className="w-full lg:w-[872px] h-full flex flex-col gap-5">
          <div className="flex items-start justify-start">
            <h1 className="text-[#6E7491] text-lg leading-6 font-semibold">
              Choose a <span className="text-[#605DEC]">departing </span>/{" "}
              <span className="text-[#605DEC]">returning </span>flight
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start w-full rounded-xl">
            <div className="w-full cursor-pointer border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE] p-6">
              {(!isFlightsArray || flights.length === 0) ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-2xl text-[#6E7491] mb-4">No matches found for your search</span>
                  <p className="text-sm text-[#A0A4B8]">Try modifying your search criteria</p>
                </div>
              ) : (
                flights.map((item, index) =>
                  cflights.flight_type === "Round Trip" ? (
                    <RoundTripFlightCard
                      key={index}
                      outboundFlight={item.outbound_flight}
                      returnFlight={item.return_flight}
                      handleClick={() => {
                        localStorage.setItem("flights_selected_index", index);
                        handleOpenLoginOrPage();
                      }}
                      tripType={cflights?.flight_type}
                    />
                  ) : (
                    <div
                      key={index}
                      onClick={() => {
                        localStorage.setItem("flights_selected_index", index);
                        handleOpenLoginOrPage();
                      }}
                    >
                      <FlightCard
                        img={item.airline.logo}
                        arrival_location={item.arrival_location.airport_name}
                        departure_location={item.departure_location.airport_name}
                        flight_class={item.flight_class}
                        passenger_type={item.passenger_type}
                        duration="1h"
                        name={item.airline.name}
                        date={format(new Date(item.departure_datetime), "yyyy-MM-dd")}
                        stop={item.stopover}
                        hnl="no stopover"
                        price={item.base_price}
                        trip={cflights?.flight_type}
                        stopovers={item.stopovers} 
                      />
                    </div>
                  )
                )
              )}
            </div>
          </div>
          <div className="w-full lg:mt-12">
            <img src={map} alt="map" className="object-cover w-full h-full" />
          </div>
        </div>

        {!priceShown && (
          <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
            <PriceDetails />
            <Link to="/booking" className="mt-5">
              <button className="text-[#605DEC] border-2 border-[#605DEC] py-2 px-3 rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                Save & Close
              </button>
            </Link>
          </div>
        )}

        {isRegisterOpen && (
          <Signup openAnotherModal={handleOpenLoginAgain} onClose={handleClose} />
        )}

        {isLoginOpen && (
          <Signin openAnotherModal={handleOpenRegisterAgain} onClose={handleClose} />
        )}
      </div>
    </>
  );
};

export default FlightChoose;
