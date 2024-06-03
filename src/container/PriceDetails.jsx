import { format } from "date-fns";

const PriceDetails = () => {
  const index = JSON.parse(localStorage.getItem("flights_selected_index"));
  const flights = JSON.parse(localStorage.getItem("flights"));
  const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
  const numOfBag = JSON.parse(localStorage.getItem("num_of_bag")); // Retrieve numOfBag from localStorage

  let selectedFlight = flights?.results ? flights.results[index] : flights[index];

  const isRoundTrip = currentFlight?.flight_type === "Round Trip";

  const outboundFlight = isRoundTrip ? selectedFlight?.outbound_flight : selectedFlight;
  const returnFlight = isRoundTrip ? selectedFlight?.return_flight : null;

  const outboundPrice = parseFloat(outboundFlight?.base_price) || 0;
  const returnPrice = parseFloat(returnFlight?.base_price) || 0;
  const totalPrice = (outboundPrice + (returnPrice || 0)).toFixed(2);

  // Determine the bag price
  let bagPrice = 0;
  if (currentFlight.flight_type === "Round Trip") {
    bagPrice =
      parseFloat(selectedFlight.outbound_flight.checked_bag_price) +
      parseFloat(selectedFlight.return_flight.checked_bag_price);
  } else {
    bagPrice = parseFloat(selectedFlight.checked_bag_price);
  }

  const flightClass = selectedFlight?.flight_class || "Economic";
  const freeBags = flightClass === "Business" ? 2 : 1;
  const additionalBags = Math.max(0, numOfBag - freeBags);
  const totalBagPrice = additionalBags * bagPrice;

  const finalTotalPrice = (parseFloat(totalPrice) + parseFloat(totalBagPrice)).toFixed(2);
  return (
    <div className="flex flex-col items-center lg:items-end justify-start lg:justify-end gap-5 w-full h-full sm:w-[400px] bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
      {/* Flight Details Section */}
      <div className="w-full border-b border-blue-100 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Flight Details</h2>
        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={outboundFlight?.airline?.logo}
              alt={outboundFlight?.airline?.name}
              className="object-contain w-14 h-14 rounded-full border border-gray-200"
            />
            <div>
              <h3 className="text-lg font-medium text-blue-800">
                {outboundFlight?.airline?.name || "N/A"}
              </h3>
              <p className="text-sm text-blue-500">
                {outboundFlight?.flight_class}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-700">
              {format(new Date(outboundFlight?.departure_datetime), "yyyy-MM-dd")}
            </p>
            <p className="text-sm text-blue-500">
              From {outboundFlight?.departure_location?.airport_name}
            </p>
            <p className="text-sm text-blue-500">
              To {outboundFlight?.arrival_location?.airport_name}
            </p>
          </div>
        </div>

        {isRoundTrip && returnFlight && (
          <div className="border-t border-blue-100 pt-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={returnFlight?.airline?.logo}
                  alt={returnFlight?.airline?.name}
                  className="object-contain w-14 h-14 rounded-full border border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-medium text-blue-800">
                    {returnFlight?.airline?.name || "N/A"}
                  </h3>
                  <p className="text-sm text-blue-500">
                    {returnFlight?.flight_class}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-700">
                  {format(new Date(returnFlight?.departure_datetime), "yyyy-MM-dd")}
                </p>
                <p className="text-sm text-blue-500">
                  From {returnFlight?.departure_location?.airport_name}
                </p>
                <p className="text-sm text-blue-500">
                  To {returnFlight?.arrival_location?.airport_name}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Details Section */}
      <div className="flex flex-col gap-4 p-4 w-full bg-blue-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Price Details</h2>
        <div className="flex justify-between items-center text-blue-800">
          <p className="font-medium">Flight Price</p>
          <p className="text-lg font-medium">${totalPrice}</p>
        </div>
        <div className="flex justify-between items-center text-blue-800">
          <p className="font-medium">Bags</p>
          <p className="text-lg font-medium">{numOfBag}</p>
        </div>
        <div className="flex justify-between items-center text-blue-800">
          <p className="font-medium">Bag Fees Total</p>
          <p className="text-lg font-medium">${totalBagPrice}</p>
        </div>
        <div className="flex justify-between items-center text-blue-800">
          <p className="font-semibold">Total Price</p>
          <p className="text-xl font-bold">${finalTotalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceDetails;
