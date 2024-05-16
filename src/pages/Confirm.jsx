import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../container";
import { hawaiian } from "../assets/logo";
import { creditCard } from "../assets/icons";

const Confirm = () => {
    const[close, setClose] = useState(true)

    const index = JSON.parse(localStorage.getItem("flights_selected_index"))
    console.log("The index of flight is", index)
    
    const flights = JSON.parse(localStorage.getItem("flights"));
    console.log("the available flights", flights);

  return (
    <>
    <div className="mb-28 flex flex-col items-start justify-between w-full h-full gap-10 px-8 mt-20 lg:flex-row ">
       <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">
          { close && (
            <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded  p-2 hidden md:flex items-center justify-center  ">
            <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">Your flight has been booked successfully! Your confirmation number is #381029404387</p>
            <MdOutlineClose className="text-[#52527A] font-medium cursor-pointer" onClick={() => setClose(false)}/>
          </div>
          )}

          <div className="flex flex-col items-start justify-start w-full gap-2 ">
            <h1 className="titleh1">Bon voyage, Sophia!</h1>
            <p className="text-[#6E7491] text-base sm:text-lg font-semibold">Confirmation number: #381029404387</p>
            <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">Thank you for booking your travel with vkTRip! Below is a summary of your trip to Narita airport in Tokyo, Japan. We’ve sent a copy of your booking confirmation to your email address. You can also find this page again in <span className="text-[#605DEC]"> My trips.</span></p>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-4">
             <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Flight summary</h1>
             <div className="flex flex-col items-start w-full gap-2 ">
             <p className="text-[#7C8DB0] text-base sm:text-lg font-semibold">Departing {flights.results[index].departure_datetimeŒ}</p>
             <div
              className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
            >
              <FlightCard
                img={hawaiian}
                duration="16h 45m"
                name="Hawaiian Airlines"
                time="7:00AM - 4:15PM"
                stop="1 stop"
                hnl="2h 45m in HNL"
                price="$624"
                trip="round trip"
              />
            </div>
            <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">Seat 9F (economy, window), 1 checked bag</p>
             </div>
             {/* <div className="flex flex-col items-start w-full gap-2 mt-8"> */}
             {/* <p className="text-[#7C8DB0] text-base sm:text-lg font-semibold">Arriving March 21st, 2023</p> */}
             {/* <div
              className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
            >
              <FlightCard
                img={hawaiian}
                duration="16h 45m"
                name="Hawaiian Airlines"
                time="7:00AM - 4:15PM"
                stop="1 stop"
                hnl="2h 45m in HNL"
                price="$624"
                trip="round trip"
              />
            </div> */}
            {/* <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">Seat 4F (business, window), 1 checked bag</p> */}
             {/* </div> */}
          </div>

       </div>

       <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
                     <div className="flex flex-col items-start w-full gap-5">
          <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Price breakdown</h1>
          <div className="w-full h-full sm:w-[400px] flex flex-col items-start gap-3 ">
             <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3" >
                <p>Departing Flight</p>
                <p>$251.50</p>
             </div>
             <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3" >
                <p>Arriving Flight</p>
                <p>$251.50</p>
             </div>
             <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3" >
                <p>Baggage fees</p>
                <p>$0</p>
             </div>
             <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3" >
                <p>Seat upgrade (business)</p>
                <p>$199</p>
             </div>
             <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3" >
                <p>Subtotal</p>
                <p>$702</p>
             </div>
             <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3" >
                <p>Taxes (9.4%)</p>
                <p>$66</p>
             </div>
             <hr className="w-full mt-5"/>
             <div className="flex items-center justify-between w-full text-[#36374A] text-sm sm:text-base gap-3" >
                <p>Amount paid</p>
                <p>$768</p>
             </div>
             <hr className="w-full "/>
          </div>
          </div>
       </div>
    </div>
    </>
  )
}

export default Confirm