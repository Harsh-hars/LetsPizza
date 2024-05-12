import {  useState } from "react";
import axios from "axios";

const Addpage = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const[amount , setAmount] = useState();

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("amount", amount);
    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er));
  };
  return (
    <div className="min-h-[100vh] p-10">
       <div className='p-4 flex flex-col justify-center items-center '>
    <h2 className='text-xl text-red-500 font-semibold t text-center mb-2'>
       Add Your Pizza Meal
   </h2>
<div className='flex flex-col justify-center items-center w-[60%] rounded-md shadow-md bg-slate-300'>
  
<form onSubmit={upload} className='flex flex-col gap-4 mt-4 justify-center items-center w-[90%]'>
   <input onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Enter title' className='border p-2 w-[90%] rounded-md' ></input>
   <input onChange={(e) => setAmount(e.target.value)} type='number' placeholder='Enter Amount' className='border p-2 w-[90%] rounded-md' ></input>
   <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' className='border p-2 w-[90%] rounded-md' ></textarea>
   <input
          className=" border-2"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
   <button type='submit' className='w-[50%] flex justify-center items-center text-white p-2  rounded-full bg-red-500 mb-4'>Create</button>
</form>

</div>
</div>

      
    </div>
  );
};

export default Addpage;
