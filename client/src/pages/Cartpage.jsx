import { useEffect, useState } from "react";
import axios from "axios";
import { SiRazorpay } from "react-icons/si";
import Cartitem from "../components/Cartitem";


const Cartpage = () => {
  const [cartdata, setCartdata] = useState([]);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [street, setStreet] = useState();
  const [pincode, setPincode] = useState();
  const [country, setCountry] = useState();
  const [updateui , setUpdateui] = useState(false);
  const totalPrice = cartdata.reduce(
    (total, cartdata) => total + cartdata.amount,
    0
  );

  // console.log(totalPrice);

  useEffect(() => {
    axios.get("/addcartpizza").then((e) => {
      const data = e.data;
      setCartdata(data);
    });
  }, [updateui]);

  console.log(cartdata);

  // paste the function here

  const ordernow = async (e) => {
    e.preventDefault();
    await axios.post("/order", {
      cartdata,
      phone,
      address,
      street,
      pincode,
      country,
    });
    console.log("order created");
  };




  const amount = totalPrice * 100;
  const currency = "INR";
  const receiptId = "qwsaq1";
  
  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);


    var options = {
      key: "rzp_test_gYiq57okl7muXo", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Harsh Bhadauriya", //your customer's name
        email: "harshbhadauriya@000.com",
        contact: "8126523130", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
   
    e.preventDefault();
   
  };









  return (
    <div className="p-4">
      <div className="flex">
        {/* part 1 */}
        <div className=" min-h-[80vh] min-w-[40%] p-4 flex flex-col items-center justify-start ">
          <div className="flex justify-start items-center flex-wrap gap-4">
            {cartdata.map((e) => (
              <Cartitem key={e._id} e={e} setUpdateui={setUpdateui} />
            ))}
          </div>
        </div>

        {/* part 2 */}
        <div className=" min-h-[80vh] min-w-[60%] flex justify-center items-center p-4 rounded-md">
          <div className="bg-red-400 p-4 flex flex-col gap-2 rounded-md text-gray-800">
            <h2 className="text-center text-white text-2xl">Check-out</h2>
            {/* <label className="text-xl" htmlFor="phone">
              Phone
            </label> */}
            <input
              className="p-2 border-2 rounded-lg"
              type="number"
              name="phone"
              placeholder="Enter the number"
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <label className="text-xl" htmlFor="address">
              address
            </label> */}
            <input
              className="p-2 border-2 rounded-lg"
              type="text"
              name="address"
              placeholder="Enter the address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex gap-3">
              <div className="flex gap-2 justify-center items-center">
                {" "}
                {/* <label className="text-xl" htmlFor="street">
                  street
                </label> */}
                <input
                  className="p-2 rounded-lg"
                  type="text"
                  name="street"
                  placeholder="Enter the street"
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-center items-center">
                <input
                  className="p-2 border-2 rounded-lg"
                  type="text"
                  name="pincode"
                  placeholder="Enter the pincode"
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            <input
              className="p-2 border-2 rounded-lg"
              type="text"
              name="country"
              placeholder="Enter the country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <button className="p-2 text-red-400 bg-white rounded-full flex gap-1 justify-center items-center" onClick={paymentHandler}>
              <SiRazorpay />
              Paynow ₹ {totalPrice}
            </button>

            <button
              onClick={ordernow}
              className="p-2 text-red-400 bg-white rounded-full"
            >
              Ordernow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
