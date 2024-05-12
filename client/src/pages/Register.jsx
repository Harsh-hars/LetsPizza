import  { useState } from 'react'
import axios from 'axios';

const Register = () => {
const [username , setUsername] = useState('');
const [email , setEmail] = useState('');
const[password,setPassword] = useState('');

const handleform =async(e)=>{
  e.preventDefault();
   await axios.post('/register' , {username , email , password});
  console.log("user created");
}

  return (
    <div className='p-4 flex flex-col justify-center items-center '>
    <h2 className='text-xl text-red-500 font-semibold t text-center mb-2'>
       Register-Youself with us
   </h2>
<div className='flex flex-col justify-center items-center w-[60%] rounded-md shadow-md bg-slate-300'>
  
<form onSubmit={handleform} className='flex flex-col gap-4 mt-4 justify-center items-center w-[90%]'>
   <input onChange={e=>setEmail(e.target.value)} type='email' placeholder='Enter the email' className='border p-2 w-[90%] rounded-md' ></input>
   <input onChange={e=>setUsername(e.target.value)} type='text' placeholder='Enter userName' className='border p-2 w-[90%] rounded-md' ></input>
   <input onChange={e=>setPassword(e.target.value)} type='password' placeholder='Enter the password' className='border p-2 w-[90%] rounded-md' ></input>
   <button type='submit' className='w-[50%] flex justify-center items-center text-white p-2  rounded-full bg-red-500 mb-4'>Create</button>
</form>

<h2 className='text-white text-xl mb-4'>Already having account ? <span className='text-red-500 underline font-semibold'><a href='/login'>Login</a></span></h2>
</div>
</div>
  )
}

export default Register
