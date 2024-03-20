import React,{useState, useEffect} from "react";
import axios from 'axios';
import { getAllUsers } from '../utils/APIRoutes';
import ConnectedUser from "./ConnectedUser/Index";
import styled from "styled-components";
import {notConnectedUsers} from "../utils/APIRoutes"
import { useNavigate } from "react-router-dom";
import { Space, Spin } from "antd";
import Topbar from "../components/Topbar/index";

function NotConnected( ) {
  const [currentUser,setCurrentUser]=useState([]);
    const [users,setUsers]=useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const  getCurrentUser= async(e) => {
      navigate(`/profile/${e}`);
    }
    useEffect(() => {
      const fetchData = async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setLoading(false);
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
          
        }
      };
  
      fetchData();
    }, []);



    useEffect(async() => {
      if(currentUser)
      {
          const response = await axios.get(`${notConnectedUsers}/${currentUser._id}`);
          setUsers(response.data);      
        }
      }, [currentUser]);

  return (
    loading ? (
      <Loader>
      <div className="loader">
      <p>Loading..Please Wait..</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
      
    </div>
    </Loader>
    ) 
    : (<>
    <Topbar currentUser={currentUser} />
    <Connect>
    <div className="connections-main">
        {users && users.map((user)=>{    
            return <ConnectedUser user={user} getCurrentUser={getCurrentUser}>

            </ConnectedUser>
        })}
    </div>
    </Connect>
    </>
    )
    )
  
}

export default NotConnected

const Loader = styled.div`
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    gap: 10px;
  
    p {
      font-family: system-ui;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.9);
      font-size: 20px;
    }
  }
`;


const Connect = styled.div`
.connections-main {
  display: grid;
  grid-template-columns: auto auto;
  gap: 60px;
  justify-content: center;
  align-items: center;
  padding-top:40px;
  padding-bottom:70px;
  text-align: center;

  border: 1px solid #bbbbbb;
  background-color: white;
  border-radius: 10px;
  max-height: 700px; /* Set maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
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
        margin-top:10px;
        font-size: 16px;
        font-weight: 600;
      }
  
      .headline {
        padding-top:60px;
        margin-top: 100px;
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