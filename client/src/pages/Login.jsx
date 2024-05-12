import axios from 'axios'
import { useContext, useState } from 'react';
import { usercontext } from '../usercontext';
import { Navigate } from 'react-router-dom';
const Login = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const{userdata , setUserdata} = useContext(usercontext);
  const [redirect , setRedirect] = useState(false);
  const handlesubmit = async(e)=>{
  e.preventDefault();
   const userdata = await axios.post('/login' , {email,password});
   const {data} = userdata;
  setUserdata(data);
  setRedirect(true)
 }

if(redirect){
  return <Navigate to={'/'}/>
}
  return (
    <div>
    <div className='p-4 flex flex-col justify-center items-center '>
     <h2 className='text-xl text-red-500 font-semibold text-center mb-2'>
        Login with us
    </h2>
<div className='flex flex-col justify-center items-center w-[60%] rounded-md shadow-md bg-slate-300'>
   
<form onSubmit={handlesubmit} className='flex flex-col gap-4 mt-4 justify-center items-center w-[90%]'>
    <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter the email' className='border p-2 w-[90%] rounded-md' ></input>
    <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter the password' className='border p-2 w-[90%]  rounded-md' ></input>
    <button type='submit' className='w-[50%] flex justify-center items-center text-white p-2  rounded-full bg-red-500 mb-4'>Login</button>
</form>

<h2 className='text-slate-100 text-xl mb-4'>Not having account ? <span className='text-red-500 underline font-semibold'><a href='/register'>Register</a></span></h2>
</div>

</div>
</div>
  )
}

export default Login
