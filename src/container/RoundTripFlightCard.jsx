import React from 'react';
import { format } from 'date-fns';

const RoundTripFlightCard = ({
  outboundFlight = {},  // Default to an empty object
  returnFlight = {},    // Default to an empty object
  handleClick,
  tripType,
}) => {
  // Extracting prices and checking for their existence before calculating totalPrice
  const outboundPrice = parseFloat(outboundFlight.base_price) || 0;
  const returnPrice = parseFloat(returnFlight.base_price) || 0;
  const totalPrice = (outboundPrice + returnPrice).toFixed(2);

  return (
    <div 
      className="p-6 mb-6 bg-white border-2 border-[#E9E8FC] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" 
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex flex-col md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-bold mb-2 text-[#605DEC]">Outbound Flight</h2>
          <div className="flex items-center gap-4 mb-4">
            {outboundFlight.airline && (
              <img src={outboundFlight.airline.logo} alt={outboundFlight.airline.name} className="object-cover w-16 h-16 rounded-full border border-gray-300" />
            )}
            <div>
              <p className="text-lg font-bold">{outboundFlight.airline?.name || 'N/A'}</p>
              <p className="text-sm text-gray-500">{`Departure: ${outboundFlight.departure_location?.airport_name || 'N/A'}`}</p>
              <p className="text-sm text-gray-500">{`Arrival: ${outboundFlight.arrival_location?.airport_name || 'N/A'}`}</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-center text-left md:w-full">
            <p className="text-sm text-gray-700">{`Date: ${outboundFlight.departure_datetime ? format(new Date(outboundFlight.departure_datetime), "yyyy-MM-dd") : 'N/A'}`}</p>
            <p className="text-sm text-gray-700">{`Duration: 1h`}</p>
          </div>
          {outboundFlight.stopovers && outboundFlight.stopovers.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2 text-[#605DEC]">Stopovers:</h3>
              {outboundFlight.stopovers.map((stopover) => (
                <div key={stopover.id} className="mb-2">
                  <p className="text-sm text-gray-500">{`Airport: ${stopover.location.airport_name}, ${stopover.location.country}`}</p>
                  <p className="text-sm text-gray-500">{`Duration: ${stopover.duration}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:w-1/2">
          <h2 className="text-lg font-bold mb-2 text-[#605DEC]">Return Flight</h2>
          <div className="flex items-center gap-4 mb-4">
            {returnFlight.airline && (
              <img src={returnFlight.airline.logo} alt={returnFlight.airline.name} className="object-cover w-16 h-16 rounded-full border border-gray-300" />
            )}
            <div>
              <p className="text-lg font-bold">{returnFlight.airline?.name || 'N/A'}</p>
              <p className="text-sm text-gray-500">{`Departure: ${returnFlight.departure_location?.airport_name || 'N/A'}`}</p>
              <p className="text-sm text-gray-500">{`Arrival: ${returnFlight.arrival_location?.airport_name || 'N/A'}`}</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-center text-left md:w-full">
            <p className="text-sm text-gray-700">{`Date: ${returnFlight.departure_datetime ? format(new Date(returnFlight.departure_datetime), "yyyy-MM-dd") : 'N/A'}`}</p>
            <p className="text-sm text-gray-700">{`Duration: 1h`}</p>
          </div>
          {returnFlight.stopovers && returnFlight.stopovers.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2 text-[#605DEC]">Stopovers:</h3>
              {returnFlight.stopovers.map((stopover) => (
                <div key={stopover.id} className="mb-2">
                  <p className="text-sm text-gray-500">{`Airport: ${stopover.location.airport_name}, ${stopover.location.country}`}</p>
                  <p className="text-sm text-gray-500">{`Duration: ${stopover.duration}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-center text-right mt-4">
        <p className="text-xl font-bold text-gray-700">{`$${totalPrice}`}</p>
        <p className="text-sm text-gray-500">{tripType || 'N/A'}</p>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{`Class: ${outboundFlight.flight_class || 'N/A'}`}</p>
          <p className="text-sm text-gray-500">{`Passenger Type: ${outboundFlight.passenger_type || 'N/A'}`}</p>
        </div>
      </div>
    </div>
  );
};

export default RoundTripFlightCard;
