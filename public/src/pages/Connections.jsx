import React, { useEffect, useState } from "react";
import ConnectionsComponent from "../components/ConnectionsComponent";
import { useNavigate } from "react-router-dom";
import { Space, Spin } from "antd";
import styled from 'styled-components';

export default function Connections({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
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
    <ConnectionsComponent currentUser={currentUser} />
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

