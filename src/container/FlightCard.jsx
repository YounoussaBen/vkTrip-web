// /* eslint-disable react/prop-types */

// const FlightCard = ({ img, duration, name, time, stop, trip, price, hnl}) => {
//   return (
//     <>
//      <div className="flex flex-row items-start justify-between w-full p-4 gap-7 ">
//          <div className="flex items-start gap-2">
//             <img src={img} alt="hawaiian" className="object-contain w-6 h-6 sm:w-9 sm:h-9" />
//             <div className="flex flex-col items-start justify-start">
//              <h2 className="text-[#27273F] font-normal text-xs  md:text-base">{duration}</h2>
//              <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">{name}</p>
//             </div>
//          </div>
//          <div className="flex items-start justify-start">
//             <p className="text-[#27273F] font-normal text-xs  md:text-base">{time}</p>
//          </div>
//          <div className="flex flex-col items-center justify-start sm:items-end">
//          <p className="text-[#27273F] font-normal text-xs   md:text-base">{stop}</p>
//          <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">{hnl}</p>
//          </div>
//          <div className="flex flex-col items-center justify-start sm:items-end">
//          <p className="text-[#27273F] font-normal text-xs  md:text-base">{price}</p>
//          <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">{trip}</p>
//          </div>
//      </div>
//     </>
//   )
// }

// export default FlightCard

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
        {/* <div className="flex flex-row items-start justify-between w-full p-4 gap-7 ">
          <div className="flex items-start gap-2">
            <img
              src={img}
              alt={name}
              className="object-contain w-6 h-6 sm:w-9 sm:h-9"
            />
            <div className="flex flex-col items-start justify-start gap-5">
              <p className="text-base font-bold md:text-xl">{name}</p>
              <div>
              <p className="text-[#7C8DB0] font-normal text-xs   md:text-[15px]">{`Departure: ${departure_location.airport_name}, ${departure_location.country}`}</p>
              <p className="text-[#7C8DB0] font-normal text-xs   md:text-[15px]">{`Arrival: ${arrival_location.airport_name}, ${arrival_location.country}`}</p>
  
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-[#27273F] font-normal text-[10px]  md:text-sm">
              {date}
            </p>
            <h2 className="text-[#27273F] font-normal text-xs  md:text-base">
              {duration}
            </h2>
          </div>
          <div className="flex flex-col items-center justify-start sm:items-end">
            <p className="text-[#27273F] font-normal text-xs   md:text-base">
              {stop}
            </p>
            <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">
              {hnl}
            </p>
          </div>
          <div className="flex flex-col items-center justify-start sm:items-end">
            <p className="text-[#27273F] font-normal text-xs  md:text-base">
              $ {price}
            </p>
            <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">
              {trip}
            </p>
            <div className="mt-3 text-right ">
              <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">{`Class: ${flight_class}`}</p>
              <p className="text-[#7C8DB0] font-normal text-xs   md:text-base">{`Passenger Type: ${passenger_type}`}</p>
            </div>
          </div>
        </div> */}
  {/* 
  <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
    <div className="flex items-center gap-2">
      <img src={img} alt={name} className="object-contain w-12 h-12" />
      <div>
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-gray-500">{`Departure: ${departure_location.airport_name}, ${departure_location.country}`}</p>
        <p className="text-sm text-gray-500">{`Arrival: ${arrival_location.airport_name}, ${arrival_location.country}`}</p>
      </div>
    </div>
    <div className="flex flex-col items-start justify-center">
      <p className="text-sm text-gray-700">{date}</p>
      <p className="text-sm text-gray-700">{duration}</p>
    </div>
    <div className="flex flex-col items-center justify-center">
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
  </div> */}
  
  <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow md:flex-row">
    <div className="flex items-center gap-2 mb-4 md:mb-0">
      <img src={img} alt={name} className="object-contain w-12 h-12" />
      <div>
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-gray-500">{`Departure: ${departure_location}, ${departure_location}`}</p>
        <p className="text-sm text-gray-500">{`Arrival: ${arrival_location}, ${arrival_location}`}</p>
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
  