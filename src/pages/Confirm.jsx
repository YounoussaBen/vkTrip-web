import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../container";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Import format function for date formatting
import { PriceDetails } from "../container";

const Confirm = () => {
    const [close, setClose] = useState(true);
    const [passengerName, setPassengerName] = useState("");
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [flightSummary, setFlightSummary] = useState("");
    const [flights, setFlights] = useState(null); // State for flights data
    const [index, setIndex] = useState(null); // State for index
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedBagPrice, setCheckedBagPrice] = useState(null)
    const [flightPrice, setFlightPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch passenger name and other details
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access");
                const bookData = JSON.parse(localStorage.getItem("booking_data"));
                const passengerId = bookData.passengers[0]; // Assuming only one passenger for simplicity

                // Fetch passenger name using passengerId
                const response = await api.get(`/passenger/${passengerId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPassengerName(response.data.FirstName + ' ' + response.data.LastName);

                // Set confirmation number
                setConfirmationNumber(bookData.id);

                // Set flight summary
                const selectedIndex = JSON.parse(localStorage.getItem("flights_selected_index"));
                const flightsData = JSON.parse(localStorage.getItem("flights")); // Retrieve flights data
                const selectedFlight = flightsData.results[selectedIndex];
                const departureDate = new Date(selectedFlight.departure_datetime).toDateString();
                setFlightSummary(`Departing on ${departureDate} from ${selectedFlight.departure_location.airport_name} to ${selectedFlight.arrival_location.airport_name}`);

                // Set flights data to state
                setFlights(flightsData);
                // Set index to state
                setIndex(selectedIndex);

                const flightPrice = selectedFlight.base_price;
                  setFlightPrice(flightPrice);

                const checkedBagPrice = selectedFlight.checked_bag_price;
                    setCheckedBagPrice(checkedBagPrice);

                const totalPrice = flightPrice + checkedBagPrice;
                  setTotalPrice(totalPrice);

                

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleMyTripsClick = () => {
        navigate("/my-flights");
    };

    return (
        <>
            <div className="mb-28 flex flex-col items-start justify-between w-full h-full gap-10 px-8 mt-20 lg:flex-row ">
                <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">
                    { close && (
                        <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded  p-2 hidden md:flex items-center justify-center  ">
                            <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">Your flight has been booked successfully! Your confirmation number is #{confirmationNumber}</p>
                            <MdOutlineClose className="text-[#52527A] font-medium cursor-pointer" onClick={() => setClose(false)} />
                        </div>
                    )}

                    <div className="flex flex-col items-start justify-start w-full gap-2 ">
                        <h1 className="titleh1">Bon voyage, {passengerName}!</h1>
                        <p className="text-[#6E7491] text-base sm:text-lg font-semibold">Confirmation number: #{confirmationNumber}</p>
                        <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">Thank you for booking your travel with vkTRip! Below is a summary of your trip <span className="text-[#605DEC]" onClick={handleMyTripsClick}> My trips.</span></p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-4">
                        <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Flight summary</h1>
                        <div className="flex flex-col items-start w-full gap-2 ">
                            <p className="text-[#7C8DB0] text-base sm:text-lg font-semibold">{flightSummary}</p>
                            {flights && index !== null && <FlightCard // Render FlightCard only if flights data and index are available
                                 img={flights.results[index].airline.logo}
                                 arrival_location={flights.results[index].arrival_location.airport_name}
                                 departure_location={flights.results[index].departure_location.airport_name}
                                 flight_class={flights.results[index].flight_class}
                                 passenger_type={flights.results[index].passenger_type}
                                 duration={flights.results[index].duration}
                                 name={flights.results[index].airline.name}
                                 date={format(
                                    new Date(flights.results[index].departure_datetime),
                                    "yyyy-MM-dd"
                                 )}
                                 stop={flights.results[index].stopovers.length > 0 ? "1 stop" : "Direct"}
                                 hnl={flights.results[index].stopovers.length > 0 ? "2h 45m in HNL" : "No stopover"}
                                 price={flights.results[index].base_price}
                                 trip={flights?.flight_type}
                              />}
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
                <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
                  <div className="flex flex-col items-start w-full gap-5">
                     <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Price breakdown</h1>
                     <div className="w-full h-full sm:w-[400px] flex flex-col items-start gap-3 ">
                     <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
                        <PriceDetails />
                        </div>
                    </div>
                  </div>
               </div>
             </div>
            </div>
        </>
    )
}

export default Confirm;
