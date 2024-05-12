/* eslint-disable react/prop-types */
import axios from "axios";

const Menuitem = ({e}) => {
  // console.log(e)
  const id = e._id;
  const sendtocart = async(ev) =>{
  ev.preventDefault();
  axios.post('/addcartpizza' , {id})
  console.log(id + "when clicked ");
  }
console.log(id)
  return (
    <div>
       <div className="flex flex-col items-center justify-center gap-2 bg-slate-300 rounded-md py-2 hover:bg-red-200 hover:text-white">
          <img src={"http://localhost:5000/images/" + e.photo} className="h-[150px] w-[150px] "/>
          <h2 className="text-2xl font-bold">{e.title}</h2>
          <h2 className="text-center">
           {e.description}
          </h2>
          <h2 className="text-center">
          ₹ {e.amount}
          </h2>
          <button onClick={sendtocart} className="p-2 bg-red-500 text-white rounded-full">
           Add to cart
          </button>
        </div>
        {/* <h2>{alldata.title}</h2> */}
    </div>
  )
}

export default Menuitem
