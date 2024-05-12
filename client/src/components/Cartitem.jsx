import axios from "axios";
import { GoTrash } from "react-icons/go";

const Cartitem = ({e , setUpdateui}) => {
    const id = e._id;
    const deleteCartitem = async(ev)=>{
    ev.preventDefault();
    axios.delete(`/removeitem/${id}`)
    setUpdateui(ev=>ev=!ev);
    }
  return (
    <div key={e._id} className="bg-red-100 p-2">
    <div className="flex justify-center items-center">
      <img
        src={"http://localhost:5000/images/" + e.photo}
        className="h-[150px] w-[150px] "
      />
    </div>
    <div className="flex gap-4 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2>{e.title}</h2>
        <h2>{e.amount}</h2>
      </div>
      {/* delete cart data */}
      <div className="flex justify-center items-center">
        <GoTrash className="text-2xl text-red-400 " onClick={deleteCartitem} />
      </div>
    </div>
  </div>
  )
}

export default Cartitem
