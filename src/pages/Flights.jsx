import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";
import { AUTH } from "../constants";
import { format } from 'date-fns';

const Flight = ({
    img,
    duration,
    name,
    date,
    stop,
    trip,
    price,
    hnl,
    arrival_location,
    departure_location,
    flight_class,
    passenger_type,
    clickable,
    onClick
}) => {
    return (
        <div 
            className={`w-full border border-[#E9E8FC] rounded-xl shadow-lg transition-all duration-300 ${clickable ? 'cursor-pointer hover:bg-[#F6F6FE]' : 'cursor-default'} p-6 mb-6`} 
            onClick={clickable ? onClick : null}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between md:flex-row bg-white">
                <div className="flex items-center gap-4">
                    <img src={img} alt={name} className="object-contain w-16 h-16 rounded-full border border-gray-200" />
                    <div>
                        <p className="text-lg font-bold text-gray-900">{name}</p>
                        <p className="text-sm text-gray-600">{`From: ${departure_location}`}</p>
                        <p className="text-sm text-gray-600">{`To: ${arrival_location}`}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center mt-4 md:mt-0 md:items-center">
                    <p className="text-base text-gray-800">{date}</p>
                    <p className="text-base text-gray-800">{duration}</p>
                </div>
                <div className="flex flex-col items-center justify-center mt-4 md:mt-0">
                    <p className="text-base text-gray-800">{stop}</p>
                    <p className="text-sm text-gray-600">{hnl}</p>
                </div>
                <div className="flex flex-col items-end justify-center text-right mt-4 md:mt-0">
                    <p className="text-lg font-bold text-gray-900">{`$${price}`}</p>
                    <p className="text-sm text-gray-600">{`Bag Price: ${trip}`}</p>
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">{`Class: ${flight_class}`}</p>
                        <p className="text-sm text-gray-600">{`Passenger Type: ${passenger_type}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExampleFlight = () => {
    const navigate = useNavigate();
    const [myTrueFlights, setTrueFlights] = useState([]);
    const [myFalseFlights, setFalseFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleOpenLoginOrPage = () => {
        const authValue = localStorage.getItem(AUTH);
        if (authValue === 'true') {
            navigate("/booking");
        } else {
            // Implement your login open logic
        }
    };

    const getMyFlights = async () => {
        try {
            const response = await api.get("/booking/user/");
            const trueFlightDetails = await Promise.all(
                response.data.results
                    .filter(booking => booking.status === true)
                    .map(async (booking) => {
                        const flightResponse = await api.get(`/flight/${booking.flights[0]}/`);
                        return flightResponse.data;
                    })
            );
            const falseFlightDetails = await Promise.all(
                response.data.results
                    .filter(booking => booking.status === false)
                    .map(async (booking) => {
                        const flightResponse = await api.get(`/flight/${booking.flights[0]}/`);
                        return flightResponse.data;
                    })
            );

            setTrueFlights(trueFlightDetails);
            setFalseFlights(falseFlightDetails);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to load flights. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyFlights();
    }, []);

    if (loading) {
        return <div className='px-10 mb-28'>Loading...</div>;
    }

    if (error) {
        return <div className='px-10 mb-28'>{error}</div>;
    }

    return (
        <div className='px-10 mb-28'>
            <h1 className='text-4xl font-extrabold text-[#6E7491] mb-10'>My Flight Bookings</h1>

            {(myTrueFlights.length === 0 && myFalseFlights.length === 0) ? 
                (
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center text-lg font-semibold text-gray-600">
                        You have no flights booked yet.
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-semibold text-[#605DEC] mb-4">Confirmed Bookings</h2>
                            {myTrueFlights.length > 0 ? (
                                myTrueFlights.map(flight => (
                                    <Flight
                                        key={flight.id}
                                        img={flight.airline.logo}
                                        duration={flight.duration}
                                        name={flight.airline.name}
                                        date={format(new Date(flight.departure_datetime), "yyyy-MM-dd")}
                                        stop={flight.stopovers.length > 0 ? `${flight.stopovers.length} stops` : "Direct"}
                                        trip={flight.checked_bag_price}
                                        price={flight.base_price}
                                        hnl={flight.duration}
                                        arrival_location={flight.arrival_location.airport_name}
                                        departure_location={flight.departure_location.airport_name}
                                        flight_class={flight.flight_class}
                                        passenger_type={flight.passenger_type}
                                        clickable={false}
                                    />
                                ))
                            ) : (
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center text-lg font-semibold text-gray-600">
                                    No confirmed bookings
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold text-[#605DEC] mb-4">Pending Payments</h2>
                            {myFalseFlights.length > 0 ? (
                                myFalseFlights.map(flight => (
                                    <Flight
                                        key={flight.id}
                                        img={flight.airline.logo}
                                        duration={flight.duration}
                                        name={flight.airline.name}
                                        date={format(new Date(flight.departure_datetime), "yyyy-MM-dd")}
                                        stop={flight.stopovers.length > 0 ? `${flight.stopovers.length} stops` : "Direct"}
                                        trip={flight.checked_bag_price}
                                        price={flight.base_price}
                                        hnl={flight.duration}
                                        arrival_location={flight.arrival_location.airport_name}
                                        departure_location={flight.departure_location.airport_name}
                                        flight_class={flight.flight_class}
                                        passenger_type={flight.passenger_type}
                                        clickable={true}
                                        onClick={handleOpenLoginOrPage}
                                    />
                                ))
                            ) : (
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center text-lg font-semibold text-gray-600">
                                    No pending payments
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ExampleFlight;
