const FlightCard = ({
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
      <>
  
  <div className="flex flex-col justify-between p-4 mb-5 bg-white border-b-8 rounded-lg shadow border-[#605DEC] md:flex-row">
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
      <p className="text-lg font-bold text-gray-700">{`$ ${price}`}</p>
      <p className="text-sm text-gray-500">{trip}</p>
      <div className="mt-2 text-right">
        <p className="text-sm text-gray-500">{`Class: ${flight_class}`}</p>
        <p className="text-sm text-gray-500">{`Passenger Type: ${passenger_type}`}</p>
      </div>
    </div>
  </div>
      </>
    );
  };
  
  export default FlightCard;
  