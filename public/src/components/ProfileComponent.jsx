import React, { useState } from "react";
import ProfileCard from "./ProfileCard/index";
import ProfileEdit from "./ProfileEdit/index";

export default function ProfileComponent( { currentUser , guestUser ,setCurrentUser } ) {
  const [isEdit, setisEdit] = useState(false);
  
  const onEdit = () => {
    setisEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        //information show krse about user
        <ProfileEdit onEdit={onEdit} currentUser = { currentUser } />
      ) : (
        <ProfileCard onEdit={onEdit} currentUser = { currentUser } guestUser={guestUser} setCurrentUser={setCurrentUser}/>
      )}
    </div>
  );
}