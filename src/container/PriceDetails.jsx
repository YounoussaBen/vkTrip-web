import { hawaiian } from "../assets/logo";
import { format } from "date-fns";

const PriceDetails = ({totalprice}) => {
  const index = JSON.parse(localStorage.getItem("flights_selected_index"));
  // console.log("The index of flight on passenger info is ", index);
  const flights = JSON.parse(localStorage.getItem("flights"));
  return (
    <>
      <div className="flex flex-col items-start lg:items-end justify-start lg:justify-end gap-5 w-full h-full sm:w-[400px]">
        <div className=" w-full border-[1px] border-[#E9E8FC] rounded-lg  flex flex-col gap-2">
          <div className="flex items-start justify-between w-full p-3 ">
            <div className="flex items-start justify-start gap-2">
              <img
                src='{flights[index]?.airline?.logo}'
                alt='{flights[index]?.airline?.name}'
                className="object-contain w-6 h-6 sm:w-9 sm:h-9"
              />
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[#27273F] font-normal text-sm sm:text-base">
                  {/* {flights[index]?.airline.name} */}
                  Hello
                </h1>
                <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                 Hello again
                  {/* {flights[index]?.flight_class} */}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
              "yyyy-MM-dd"
              {/* {format(
                      new Date(flights[index]?.departure_datetime),
                      "yyyy-MM-dd"
                    )} */}
              </p>
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                7:00 AM - 4:15 PM
              </p>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                2h 45m in HNL
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 w-[231px]">
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Subtotal</p>
            <p>
              hello subtotal
              {/* ${flights[index]?.base_price} */}
            </p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Bags Fees</p>
            <p>$121</p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Taxes and Fees</p>
            <p>
              total
              {/* {totalprice} */}
            </p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Total</p>
            <p>
              jello
              {/* ${parseFloat(flights[index]?.base_price)} */}
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
