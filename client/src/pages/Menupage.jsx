
import { useEffect, useState } from "react";
import Menuitem from "../components/Menuitem";
import axios from "axios";
const Menupage = () => {
  const [pizzadata, setPizzadata] = useState([]);
const[burgerdata , setBurgerdata] = useState([]);
  const getdata = async () => {
    await axios.get("/getallpizza").then((res) => setPizzadata(res.data));
    await axios.get("/getallburger").then((res) => setBurgerdata(res.data));
  };

  useEffect(() => {
    getdata();
  }, []);


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
        {pizzadata.map((e) => (
          // <img key={e._id} src={"http://localhost:5000/images/" + e.photo} />
          <Menuitem id={e._id} key={e._id} e={e} />
        ))}
      </div>
      <div>
        <h2 className="text-center text-xl">CheckOut</h2>
        <h2 className="text-center text-3xl text-red-500 font-bold">
          Our Best Sellings burgers
        </h2>
      </div>

      <div className="grid grid-cols-3 px-[60px] gap-2 mt-2 ">
        {burgerdata.map((e) => (
          // <img key={e._id} src={"http://localhost:5000/images/" + e.photo} />
          <Menuitem id={e._id} key={e._id} e={e} />
        ))}
      </div>
    </div>
  );
}

export default Menupage
