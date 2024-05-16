import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";
import {AUTH} from "../constants";

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
                    <p className="text-sm text-gray-500">{`Bag Price: ${trip}`}</p>
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
  const navigate = useNavigate();
    const [myTrueflights, setTrueFlights] = useState([]);
    const [myFalseFlights, setFalseFlights] = useState([]);

    const handleOpenLoginOrPage = () => {
      const authValue = localStorage.getItem(AUTH)
      if (authValue === 'true') {
        // history.push("/booking");
        navigate("/booking");
      } else {
        setIsLoginOpen(true);
      }
    };
    // const getMyFlight = async () => {
    //     try {
    //         const response = await api.get("/booking/user/");
    //     console.log('the my flight response is ', response)
    //     console.log('the bookings are', response)
    //         const flightDetails = await Promise.all(
    //           response.data.results.map(async (flight) => {
    //             const flightResponse = await api.get(`/flight/${flight.flights[0]}/`);
    //             return flightResponse.data;
    //           })
    //         );
        
    //         setFlights(flightDetails);
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    //   };

    const getMyFlight = async () => {
      try {
        const response = await api.get("/booking/user/");
        console.log('the my flight response is ', response)
        console.log('the bookings are', response)
        // const flightDetails = await Promise.all(
        //   response.data.results.map(async (flight) => {
        //     const flightResponse = await api.get(`/flight/${flight.flights[0]}/`);
        //     return flightResponse.data;
        //   })
        // );

        const trueFlightDetails = await Promise.all(
          response.data.results
            .filter(booking => booking.status === true)
            .map(async (booking) => {
              console.log('the booking is ', booking)
              const flightResponse = await api.get(`/flight/${booking.flights[0]}/`);
              return flightResponse.data;
            })
        );
        const falseFlightDetails = await Promise.all(
          response.data.results
            .filter(booking => booking.status === false)
            .map(async (booking) => {
              console.log('the booking is ', booking)
              const flightResponse = await api.get(`/flight/${booking.flights[0]}/`);
              return flightResponse.data;
            })
        );
    
        setTrueFlights(trueFlightDetails);
        setFalseFlights(falseFlightDetails);
      } catch (error) {
        console.error('Error:', error);
      }
    };

      useEffect(() => {
        getMyFlight();
      }, []);
      console.log('the my true flights are ', myTrueflights)
      console.log('the my false flights are ', myFalseFlights)
      if(myTrueflights === null || myFalseFlights === null){
          return <div>Loading...</div>
      }
    return (
        
    <div className='px-10 mb-28'>
        <p className='pb-10 text-3xl font-black'>My flights</p>
        {(myTrueflights.length === 0) ? 
        (
            <div className="flex flex-col items-start justify-start rounded-xl w-full text-2xl font-bold cursor-pointer border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE] ">No booked flight</div>
        )
        :
        (
          <div className="">
            <div className="mb-10">
              <div className="flex flex-col items-start pb-5 justify-start rounded-xl w-full text-2xl font-bold cursor-pointer border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE] ">
                <p className='text-2xl font-bold'>Paid Flights</p>
              </div>
            {
               myTrueflights.map(flight => (
                <Flight
                  img={flight.airline.logo}
                //   duration={flight.}
                  name={flight.airline.name}
                //   date={flight.departure_datetime}
                //   stop={flight.stopovers[0].location.airport_name}
                  trip={flight.checked_bag_price}
                  price={flight.base_price}
                  // hnl={flight.status}
                  arrival_location={flight.arrival_location.airport_name}
                  departure_location={flight.departure_location.airport_name}
                  flight_class={flight.flight_class}
                  passenger_type={flight.passenger_type}
                />
              ))
            }
            </div>

            <div>
            <div className="flex flex-col pb-5 items-start justify-start rounded-xl w-full text-2xl font-bold cursor-pointer border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE] ">
                <p className='text-2xl font-bold'> Not yet paid Flights</p>
            </div>
            <div
            // onClick={() =>{ handleOpenLoginOrPage()}}
            >
            {
               myFalseFlights.map(flight => (
                <Flight
                  img={flight.airline.logo}
                //   duration={flight.}
                  name={flight.airline.name}
                //   date={flight.departure_datetime}
                //   stop={flight.stopovers[0].location.airport_name}
                  trip={flight.checked_bag_price}
                  price={flight.base_price}
                  // hnl={flight.status}
                  arrival_location={flight.arrival_location.airport_name}
                  departure_location={flight.departure_location.airport_name}
                  flight_class={flight.flight_class}
                  passenger_type={flight.passenger_type}
                />
              ))
            }
            </div>
            </div>

          </div>



            // myTrueflights.map(flight => (
            //   <Flight
            //     img={flight.airline.logo}
            //   //   duration={flight.}
            //     name={flight.airline.name}
            //   //   date={flight.departure_datetime}
            //   //   stop={flight.stopovers[0].location.airport_name}
            //     trip={flight.checked_bag_price}
            //     price={flight.base_price}
            //     hnl={flight.status}
            //     arrival_location={flight.arrival_location.airport_name}
            //     departure_location={flight.departure_location.airport_name}
            //     flight_class={flight.flight_class}
            //     passenger_type={flight.passenger_type}
            //   />
            // ))
        )}
      
    </div>
    );
};

export default ExampleFlight;
