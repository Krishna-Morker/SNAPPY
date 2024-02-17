import React,{useState, useEffect} from "react";
import axios from 'axios';
import { getAllUsers } from '../utils/APIRoutes';
import ConnectedUser from "../components/ConnectedUser/index";
import styled from "styled-components";
import {addConnection} from "../utils/APIRoutes"

function ConnectionsComponent( {currentUser} ) {
    const [users,setUsers]=useState([]);
    
    const  getCurrentUser= async(e) => {
      if(e){
     const data= await axios.post(`${addConnection}/${currentUser._id}`, { e } );
     console.log(data);
      }
    }
    
    useEffect(async() => {
      if(currentUser)
      {
        console.log(currentUser);
          const response = await axios.get(`${getAllUsers}/${currentUser._id}`);
          setUsers(response.data);
        
        
            
        }
      }, [currentUser]);

  return (
    <Connect>
    <div className="connections-main">
        {users && users.map((user)=>{    
            return <ConnectedUser user={user} getCurrentUser={getCurrentUser}>

            </ConnectedUser>
        })}
    </div>
    </Connect>
  )
}

export default ConnectionsComponent


const Connect = styled.div`
.connections-main {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    text-align: center;
    margin: 30px;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 10px;
    .grid-child {
      border: 1px solid #bbbbbb;
      width: 250px;
      height: 330px;
      margin: 10px;
      padding: 10px;
      display: flex;
  
      align-items: center;
      flex-direction: column;
      border-radius: 10px;
      position: relative;
      cursor: pointer;
  
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        margin-top: 20px;
      }
  
      .name {
        font-family: system-ui;
        font-size: 16px;
        font-weight: 600;
      }
  
      .headline {
        margin-top: -15px;
        font-family: system-ui;
        font-size: 15px;
        font-weight: 400;
      }
  
      button {
        width: 90%;
        height: 40px;
        position: absolute;
  
        bottom: 10px;
        cursor: pointer;
        background-color: white;
        color: #004284;
        border: 1px solid #004284;
        font-size: 16px;
        font-family: system-ui;
        border-radius: 30px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
  
      button:hover {
        border: 2px solid #004284;
        background-color: #bbdefb;
      }
    }
  }
  `