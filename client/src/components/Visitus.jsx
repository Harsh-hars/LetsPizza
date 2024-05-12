import React from 'react'

const Visitus = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-2'>
      <h2 className='text-red-500 text-3xl font-bold'>Visit us</h2>
      <div className='bg-slate-300 p-3 min-w-[90vw] min-h-[20vh] flex flex-col justify-center items-center'>
      <h2 className='text-xl'>Our Address : <span className='text-red-500'>Radha enclave township,Mathura(u.p)</span></h2>
      <h2>Landmark : <span className='text-red-500'>infront of Shiv Mandir</span></h2>
      <div className='flex gap-4 justify-center items-center'>
        <h2 className='border-2 p-2 rounded-md bg-red-500 text-white shadow-lg'>9760134xxx</h2> 
        <h2 className='border-2 p-2 rounded-md bg-red-500 text-white shadow-lg'>8126523xxx</h2>
      </div>
      </div>
    </div>
  )
}

export default Visitus
