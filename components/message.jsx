import React from 'react';












export default function Message({children, avatar, username, description}) {





  return (
    <div className='bg-white p-8 border-2 shadow-2xl mt-6 rounded-lg'>
        <div className="flex items-center gap-2">
            <img src={avatar} className="w-10 rounded-full cursor-pointer"/>
            <h2 className='font-semibold cursor-pointer'>{username}</h2>
        </div>
        <div className="py-4 px-4">
            <p>{description}</p>
        </div>
      {children}
    </div>
  )
}
