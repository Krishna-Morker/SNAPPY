import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function index( {
    user,
    getCurrentUser
}) {
 // const navigate = useNavigate();

  return (
    <div className='grid-child ' onClick={()=>getCurrentUser(user._id)}>
        <p>{user.email}</p>
        <p>{user.headline}</p>
    </div>
  )
}
