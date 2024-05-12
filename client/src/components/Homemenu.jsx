import { useEffect, useState } from "react";
import Menuitem from "./Menuitem";
import axios from "axios";
const Homemenu = () => {
  const [alldata, setAlldata] = useState([]);
const[burgerdata , setBurgerdata] = useState([]);
  const getdata = async () => {
    await axios.get("/getpizza").then((res) => setAlldata(res.data));
    await axios.get("/getburger").then((res) => setBurgerdata(res.data));
  };

  useEffect(() => {
    getdata();
  }, []);

  console.log(alldata);

  return (
    <div>
      <div>
        <h2 className="text-center text-xl">CheckOut</h2>
        <h2 className="text-center text-3xl text-red-500 font-bold">
          Our Best Sellings
        </h2>
      </div>

      <div className="absolute left-[-35px] -z-40">
        <img src="/sallad1.png " />
      </div>

      <div className="absolute right-0 -z-40">
        <img src="/sallad2.png " className="" />
      </div>

      <div className="grid grid-cols-3 px-[60px] gap-2 ">
        {alldata.map((e) => (
          <Menuitem id={e._id} key={e._id} e={e} />
        ))}
      </div>
   
    </div>
  );
};

export default Homemenu;
