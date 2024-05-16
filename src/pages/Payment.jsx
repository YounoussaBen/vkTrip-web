import {
    AiOutlineCreditCard,
  } from "react-icons/ai";
  import { Link, useNavigate } from "react-router-dom";
  import { PriceDetails } from "../container";
  import { useState } from "react";
  import { toast } from "react-toastify";
  import api from "../api";
  
  const Payment = () => {
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [ccv, setCcv] = useState("");
    const bookData = JSON.parse(localStorage.getItem("booking_data"))
    console.log('The payment data in storage',bookData)

    const paymentData = {
      'booking_id':bookData.id,
      'total_price':bookData.total_price,
      'card_token':'tok_visa_cartesBancaires'
    }
      
        const payMyFlight = async (e) => {
          // e.preventDefault();
          console.log('The payment data is', paymentData)
             const  response = await api.post("/payment/visa-card", paymentData);
             console.log("The payment info on payment.tsx is ", JSON.stringify(response?.data));
             localStorage.setItem('flights', JSON.stringify(response.data));
      
             const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
             console.log("The tokens in local storage is ", tokens);
       }
  
    const submitInputs = (e) => {
      e.preventDefault();
  
      if (
        name.trim() !== "" &&
        number.trim() !== "" &&
        ccv.trim() !== "" &&
        date.trim() !== ""
      ) {
        payMyFlight()
        toast.success("Payment sent successfully");
        navigate("/confirm");
      } else {
        toast.warning("Please fill the card details");
      }
    };

  

  
    return (
      <>
        <div className="mb-28 flex flex-col items-start justify-between w-full h-full gap-10 px-8 mt-20 lg:flex-row">
          <div className="w-full lg:w-[686px] flex flex-col items-start gap-12">
            <div className="flex flex-col items-start w-full gap-2">
              <h1 className="titleh1">Payment method</h1>
              <p className="text-[#7C8DB0] text-base font-normal">
                Make a payment method below. vkTrip processes your payment
                securely with end-to-end encryption.
              </p>
            </div>
            <div className="w-full h-12 md:w-[686px] border-2 border-[#605DEC] flex justify-between items-center rounded">
              <p className="w-full h-full flex items-center justify-center gap-1 bg-[#605DEC] text-[#FAFAFA] text-sm sm:text-base">
                <AiOutlineCreditCard />
                <span>Credit card</span>
              </p>
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-5">
              <h2 className="text-[#6E7491] text-xl">Credit card details</h2>
              <form className="w-full h-full flex flex-col items-start justify-start gap-5">
              <input
                type="text"
                placeholder="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
              />
              <div className="flex items-center justify-center gap-5">
                <input
                  type="text"
                  placeholder="Expiration date [MM/YY]"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full sm:w-[240px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="text"
                  placeholder="CCV"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                  className="w-full sm:w-[216px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
              </div>
            </form>
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-5">
              <div className="flex flex-col items-start justify-start gap-3">
                <h2 className="text-[#6E7491] text-xl">Cancellation policy</h2>
                <p className="text-[#7C8DB0] text-base font-normal">
                  This flight has a flexible cancellation policy. If you cancel or
                  change your flight up to 30 days before the departure date, you
                  are eligible for a free refund. All flights booked on vkTrip are
                  backed by our satisfaction guarantee, however cancellation
                  policies vary by airline. See the{" "}
                  <span className="text-[#605CDE]">
                    {" "}
                    full cancellation policy
                  </span>{" "}
                  for this flight.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/booking">
                <button className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                  Back to passenger info
                </button>
              </Link>
              <Link>
                <button
                  className="hidden lg:block py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                  onClick={submitInputs}
                  // onClick={(e)=> payMyFlight()}
                >
                  Confirm and pay
                </button>
              </Link>
            </div>
          </div>
  
          <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
            <PriceDetails />
            <Link
             className="mt-5">
              <button
                className="py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                // onClick={payMyFlight()}
              >
                Confirm and pay
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  };
  
  export default Payment;
  