import React from 'react';
import { hawaiian } from "../assets/logo";

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
}) => {
    return (
        <div className="mb-2 w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]">
            <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow md:flex-row">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <img src={img} alt={name} className="object-contain w-12 h-12" />
                    <div>
                        <p className="text-lg font-bold">{name}</p>
                        <p className="text-sm text-gray-500">{`Departure: ${departure_location}`}</p>
                        <p className="text-sm text-gray-500">{`Arrival: ${arrival_location}`}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center mb-4 md:items-center md:mb-0">
                    <p className="text-sm text-gray-700">{date}</p>
                    <p className="text-sm text-gray-700">{duration}</p>
                </div>
                <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                    <p className="text-sm text-gray-700">{stop}</p>
                    <p className="text-sm text-gray-500">{hnl}</p>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <p className="text-lg font-bold text-gray-700">{`$${price}`}</p>
                    <p className="text-sm text-gray-500">{trip}</p>
                    <div className="mt-2 text-right">
                        <p className="text-sm text-gray-500">{`Class: ${flight_class}`}</p>
                        <p className="text-sm text-gray-500">{`Passenger Type: ${passenger_type}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Example usage:
const ExampleFlight = () => {
    return (
    <div className='mb-28'>
        <Flight
                img={hawaiian}
                duration="16h 45m"
                name="Hawaiian Airlines"
                date="February 25th, 2023"
                stop="1 stop"
                trip="round trip"
                price="624"
                hnl="2h 45m in HNL"
                arrival_location="Tokyo, Japan"
                departure_location="Narita airport"
                flight_class="Business"
                passenger_type="Adult"
        />         
        <Flight
            img={hawaiian}
            duration="16h 45m"
            name="Hawaiian Airlines"
            date="February 25th, 2023"
            stop="1 stop"
            trip="round trip"
            price="624"
            hnl="2h 45m in HNL"
            arrival_location="Tokyo, Japan"
            departure_location="Narita airport"
            flight_class="Business"
            passenger_type="Adult"
        />
        <Flight
        img={hawaiian}
        duration="16h 45m"
        name="Hawaiian Airlines"
        date="February 25th, 2023"
        stop="1 stop"
        trip="round trip"
        price="624"
        hnl="2h 45m in HNL"
        arrival_location="Tokyo, Japan"
        departure_location="Narita airport"
        flight_class="Business"
        passenger_type="Adult"
        />
    </div>
    );
};

export default ExampleFlight;
