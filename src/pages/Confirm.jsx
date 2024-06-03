import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard, PriceDetails } from "../container";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Confirm = () => {
    const [close, setClose] = useState(true);
    const [passengerName, setPassengerName] = useState("");
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [flightSummary, setFlightSummary] = useState([]);
    const [flights, setFlights] = useState(null);
    const [index, setIndex] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedBagPrice, setCheckedBagPrice] = useState(null);
    const [flightPrice, setFlightPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access");
                const bookData = JSON.parse(localStorage.getItem("booking_data"));
                const passengerId = bookData.passengers[0];

                const response = await api.get(`/passenger/${passengerId}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setPassengerName(response.data.FirstName + ' ' + response.data.LastName);
                setConfirmationNumber(bookData.id);

                const selectedIndex = JSON.parse(localStorage.getItem("flights_selected_index"));
                const flightsData = JSON.parse(localStorage.getItem("flights"));
                const selectedFlight = flightsData.results[selectedIndex];
                const isRoundTrip = selectedFlight.return_flight !== undefined;

                const summary = [];
                if (selectedFlight.outbound_flight) {
                    const departureDateOutbound = new Date(selectedFlight.outbound_flight.departure_datetime).toDateString();
                    summary.push(`Outbound flight departing on ${departureDateOutbound} from ${selectedFlight.outbound_flight.departure_location.airport_name} to ${selectedFlight.outbound_flight.arrival_location.airport_name}`);
                }
                if (isRoundTrip && selectedFlight.return_flight) {
                    const returnDateReturn = new Date(selectedFlight.return_flight.departure_datetime).toDateString();
                    summary.push(`Return flight departing on ${returnDateReturn} from ${selectedFlight.return_flight.departure_location.airport_name} to ${selectedFlight.return_flight.arrival_location.airport_name}`);
                }
                setFlightSummary(summary);

                setFlights(flightsData);
                setIndex(selectedIndex);

                const flightPrice = parseFloat(selectedFlight.outbound_flight.base_price);
                const checkedBagPrice = parseFloat(selectedFlight.outbound_flight.checked_bag_price) + 
                    (isRoundTrip ? parseFloat(selectedFlight.return_flight.checked_bag_price) : 0);
                const totalPrice = flightPrice + checkedBagPrice;
                setFlightPrice(flightPrice);
                setCheckedBagPrice(checkedBagPrice);
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
                    {close && (
                        <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded p-2 hidden md:flex items-center justify-center">
                            <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">
                                Your flight has been booked successfully! Your confirmation number is #{confirmationNumber}
                            </p>
                            <MdOutlineClose className="text-[#52527A] font-medium cursor-pointer" onClick={() => setClose(false)} />
                        </div>
                    )}

                    <div className="flex flex-col items-start justify-start w-full gap-2">
                        <h1 className="titleh1">Bon voyage, {passengerName}!</h1>
                        <p className="text-[#6E7491] text-base sm:text-lg font-semibold">Confirmation number: #{confirmationNumber}</p>
                        <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">
                            Thank you for booking your travel with vkTRip! Below is a summary of your trip <span className="text-[#605DEC]" onClick={handleMyTripsClick}> My trips.</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-4">
                        <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Flight summary</h1>
                        <div className="flex flex-col items-start w-full gap-2">
                            {flightSummary.map((summary, idx) => (
                                <p key={idx} className="text-[#7C8DB0] text-base sm:text-lg font-semibold">{summary}</p>
                            ))}
                            {flights && index !== null && (
                                <>
                                    <FlightCard
                                        img={flights.results[index].outbound_flight.airline.logo}
                                        arrival_location={flights.results[index].outbound_flight.arrival_location.airport_name}
                                        departure_location={flights.results[index].outbound_flight.departure_location.airport_name}
                                        flight_class={flights.results[index].outbound_flight.flight_class}
                                        passenger_type={flights.results[index].outbound_flight.passenger_type}
                                        duration={flights.results[index].outbound_flight.duration}
                                        name={flights.results[index].outbound_flight.airline.name}
                                        date={format(new Date(flights.results[index].outbound_flight.departure_datetime), "yyyy-MM-dd")}
                                        stop={flights.results[index].outbound_flight.stopovers.length > 0 ? "1 stop" : "Direct"}
                                        hnl={flights.results[index].outbound_flight.stopovers.length > 0 ? "2h 45m in HNL" : "No stopover"}
                                        price={flights.results[index].outbound_flight.base_price}
                                    />
                                    {flights.results[index].return_flight && (
                                        <FlightCard
                                            img={flights.results[index].return_flight.airline.logo}
                                            arrival_location={flights.results[index].return_flight.arrival_location.airport_name}
                                            departure_location={flights.results[index].return_flight.departure_location.airport_name}
                                            flight_class={flights.results[index].return_flight.flight_class}
                                            passenger_type={flights.results[index].return_flight.passenger_type}
                                            duration={flights.results[index].return_flight.duration}
                                            name={flights.results[index].return_flight.airline.name}
                                            date={format(new Date(flights.results[index].return_flight.departure_datetime), "yyyy-MM-dd")}
                                            stop={flights.results[index].return_flight.stopovers.length > 0 ? "1 stop" : "Direct"}
                                            hnl={flights.results[index].return_flight.stopovers.length > 0 ? "2h 45m in HNL" : "No stopover"}
                                            price={flights.results[index].return_flight.base_price}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
                    <div className="flex flex-col items-start w-full gap-5">
                        <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Price breakdown</h1>
                        <div className="w-full h-full sm:w-[400px] flex flex-col items-start gap-3">
                            <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
                                <PriceDetails />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Confirm;
