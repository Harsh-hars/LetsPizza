import { useContext, useEffect } from "react"
import { usercontext } from "../usercontext"
import axios from 'axios'
import { LiaShoppingCartSolid } from "react-icons/lia";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineMenuBook } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoMdContacts } from "react-icons/io";
import {Link} from 'react-router-dom'
const Header = () => {
  const {userdata,setUserdata} = useContext(usercontext);
  const logoutuser = async()=>{
   await axios.post('/logout')
  }

  useEffect(()=>{
    if(!userdata){
      axios.get("/profile").then(({ data }) => {
        setUserdata(data);
      });
    }
  },[userdata])
  return (
    <div className="flex gap-4 justify-between items-center p-2 " >
      
      <div className="flex items-center justify-center">
        <h2 className="text-2xl p-1">Pizza<span className="text-red-500">-HUB</span></h2>
        </div>
      
      <div className="p-4 flex gap-4 items-center "> 
        <a href="/"><h3 className="text-xl flex gap-1 justify-center items-center"><TiHomeOutline/> Home</h3></a>
        <a href="/menu"><h3 className="text-xl flex gap-1 justify-center items-center"><MdOutlineMenuBook/> Menu</h3></a>
        <h3 className="text-xl flex gap-1 justify-center items-center"><IoMdContacts/> Contact</h3>
        <Link to={'/cart'}>
        <h3 className="text-3xl"><LiaShoppingCartSolid className="text-3xl"/></h3>
        </Link>
      </div>

      <div className="flex gap-4 justify-center items-center">
      {!userdata && (<a href="/register"><h3 className="text-xl">Register</h3> </a>)}
      {!userdata && (<a href="/login"><h3 className="bg-red-500 p-3 text-xl text-white rounded-full">Login</h3></a> )}
      {userdata && ( <h3 className="bg-red-500 p-3 text-xl text-white rounded-full">{userdata && userdata.username}</h3> )}
      {userdata && ( <h3 onClick={logoutuser} className="bg-red-500 p-3 text-xl text-white rounded-full">Log-out</h3> )}
      </div>
    </div>
  )
}

export default Header

