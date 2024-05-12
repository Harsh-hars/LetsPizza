import React from 'react'

const Sectionheader = ({title , description}) => {
  return (
    <div className=''>
      <h2 className='text-center text-xl mt-2'>{title}</h2>
      <h2 className='text-center text-red-500 text-3xl font-semibold'>{description}</h2>
    </div>
  )
}

export default Sectionheader
