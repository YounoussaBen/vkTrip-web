import { hawaiian } from "../assets/logo";
import { format } from "date-fns";

const PriceDetails = ({totalprice}) => {
  const index = JSON.parse(localStorage.getItem("flights_selected_index"))
  console.log("The index of flight is", index)

  const flights = JSON.parse(localStorage.getItem("flights"));
    console.log("the available flights", flights);
  return (
    <>
      <div className="flex flex-col items-start lg:items-end justify-start lg:justify-end gap-5 w-full h-full sm:w-[400px]">
        <div className=" w-full border-[1px] border-[#E9E8FC] rounded-lg  flex flex-col gap-2">
          <div className="flex items-start justify-between w-full p-3 ">
            <div className="flex items-start justify-start gap-2">
              <img
                src={flights.results[index]?.airline?.logo}
                alt={flights.results[index]?.airline?.name}
                className="object-contain w-6 h-6 sm:w-9 sm:h-9"
              />
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[#27273F] font-normal text-sm sm:text-base">
                  {flights.results[index]?.airline.name}
                  {totalprice}
                </h1>
                <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                  {flights.results[index]?.flight_class}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
              {format(
                      new Date(flights.results[index]?.departure_datetime),
                      "yyyy-MM-dd"
                    )}
              </p>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                From {flights.results[index].departure_location.airport_name}
              </p>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
              To {flights.results[index].arrival_location.airport_name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 w-[231px]">
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Subtotal</p>
            <p>
              ${flights.results[index]?.base_price}
            </p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Bags Fees</p>
            <p>$121</p>
          </div>
          {/* <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Taxes and Fees</p>
            <p>
              {totalprice}
            </p>
          </div> */}
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Total</p>
            <p>
              ${parseFloat(flights.results[index]?.base_price)}
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
