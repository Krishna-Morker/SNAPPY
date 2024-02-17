import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar/index";
import Connections from "../pages/Connections";

export default function ConnectionLayout() {
    const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
        
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Connections currentUser={currentUser} />
    </div>
  );
}