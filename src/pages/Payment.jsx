import { AiOutlineCreditCard } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { PriceDetails } from "../container";
import { useState, useEffect } from "react";
import api from "../api";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from "react-toastify";

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const handlePayment = async () => {
    try {
      if (!stripe || !elements) {
        console.error("Stripe.js hasn't loaded yet.");
        return;
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error("Stripe error:", error);
        // Handle error
      } else {
        // Send the paymentMethod.id to your backend
        const token = localStorage.getItem("access");
        const bookData = JSON.parse(localStorage.getItem("booking_data"));
        const response = await api.post("/payment/visa-card", {
          card_token: 'tok_visa_cartesBancaires',
          booking_id: bookData.id,
          total_price: parseFloat(bookData.total_price),
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // Log the response data
      console.log("API response:", response.data);
        toast.success("Payment successful!");
          // Handle response from backend
        navigate("/confirm");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const submitInputs = async (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setIsLoading(true); // Set loading to true when payment process starts
      await handlePayment();
      setIsLoading(false); // Set loading to false when payment process completes
    } else {
      toast.warning("Please fill the card details");
    }
  };  

  const handleCardChange = (e) => {
    // Handle card change
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between w-full h-full gap-10 px-8 mt-20 mb-28 lg:flex-row">
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
            <form className="flex flex-col items-start justify-start w-full h-full gap-5">
              <input
                type="text"
                placeholder="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
              />
              <CardElement
                className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                onChange={handleCardChange}
              />
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
          <div className="block lg:flex   items-center gap-5">
            <Link to="/booking">
              <button className=" hidden lg:flex py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                Back to passenger info
              </button>
            </Link>
            <Link>
            <button
                className="block py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                onClick={submitInputs}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm and pay"}
            </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start justify-end gap-10 mt-10 lg:items-end">
          <PriceDetails />
        </div>
      </div>
    </>
  );
};

const Payment = () => {
  const stripePromise = loadStripe("pk_test_51PDCEC2LXv2e51yJki6Y0Ko5uYtufmdpEla7A8oYKzv3pzeEHoQSgUn53XUVM0OSf60aHDbT2n2o2PkEvcRrEdT500PbEi8tQY");

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
