import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host ,getUserById} from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Topbar from "../components/Topbar";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const reArrangeContact = async function (_id) {
    try {
      const { data } = await axios.get(`${getUserById}/${_id}`);
  
      setContacts((prevContacts) => {
        const filteredContacts = prevContacts.filter(
          (contact) => contact._id !== data._id
        );
        // Using unshift to add the new contact at the beginning
        return [data, ...filteredContacts];
      });
    } catch (error) {
      console.error("Error rearranging contacts:", error);
    }
  };
  
  
  return (
    <>
      <Topbar currentUser={currentUser}/>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange}  currentUser={currentUser}/>
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser}/>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} reArrangeContact={reArrangeContact}/>
          )}
        </div>
      </Container>   
    </>
  );
}

const Container = styled.div`
  height: 92.4vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
