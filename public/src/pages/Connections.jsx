import React, { useEffect, useState } from "react";
import ConnectionsComponent from "../components/ConnectionsComponent";
import NotConnected from "../components/NotConnected";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Space, Spin } from "antd";
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Connections({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  
const router = createBrowserRouter([
  {
    element: <Connections />,
    children: [
      {
        path: "/connected",
        element: <ConnectionsComponent currentUser = { currentUser} />,
      },
      {
        path: "/connections/notconnected",
        element: <NotConnected currentUser = { currentUser} />,
      },
    ],
  },
]);



  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
      } else {
      setLoading(false);
      }
    };

    fetchData();
  }, []);
  return loading ? (
    <Loader>
    <div className="loader">
    <p>Loading..Please Wait..</p>
    <Space size="middle">
      <Spin size="large" />
    </Space>
    
  </div>
  </Loader>
  ) : (
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      Dropdown Button
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}



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

