const FlightCard = ({
  img = '',
  duration = '',
  name = '',
  date = '',
  stop = '',
  trip = '',
  price = 0,
  hnl = '',
  arrival_location = '',
  departure_location = '',
  flight_class = '',
  passenger_type = '',
  stopovers = [],
}) => {
  return (
    <div className="p-6 mb-6 bg-white border-2 border-[#E9E8FC] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img src={img} alt={name} className="object-cover w-16 h-16 rounded-full border border-gray-300" />
          <div>
            <p className="text-lg font-bold text-[#605DEC]">{name}</p>
            <p className="text-sm text-gray-500">{`Departure: ${departure_location}`}</p>
            <p className="text-sm text-gray-500">{`Arrival: ${arrival_location}`}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start md:items-center text-right md:text-left md:w-1/4">
          <p className="text-sm text-gray-700">{`Date: ${date}`}</p>
          <p className="text-sm text-gray-700">{`Duration: ${duration}`}</p>
        </div>
        <div className="flex flex-col items-start justify-start md:items-center text-right md:text-left md:w-1/4">
          <p className="text-sm text-gray-700">{stop}</p>
          <p className="text-sm text-gray-500">{hnl}</p>
        </div>
        <div className="flex flex-col items-end justify-center text-right md:w-1/4">
          <p className="text-xl font-bold text-gray-700">{`$${price}`}</p>
          <p className="text-sm text-gray-500">{trip}</p>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{`Class: ${flight_class}`}</p>
            <p className="text-sm text-gray-500">{`Passenger Type: ${passenger_type}`}</p>
          </div>
        </div>
      </div>
      
      {stopovers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2 text-[#605DEC]">Stopovers:</h3>
          {stopovers.map((stopover) => (
            <div key={stopover.id} className="mb-2">
              <p className="text-sm text-gray-500">{`Airport: ${stopover.location.airport_name}, ${stopover.location.country}`}</p>
              <p className="text-sm text-gray-500">{`Duration: ${stopover.duration}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
