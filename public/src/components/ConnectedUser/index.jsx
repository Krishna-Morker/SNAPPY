import React,{useState,useEffect} from 'react'

export default function index( {
    user,
    getCurrentUser
}) {
  return (
    <div className='grid-child ' onClick={()=>getCurrentUser(user._id)}>
        <p>{user.email}</p>
        <p>{user.headline}</p>
    </div>
  )
}
