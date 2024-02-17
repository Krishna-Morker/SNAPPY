import React, { useEffect, useState } from "react";
import { Modal, Avatar } from "antd";
import styled from 'styled-components';
import like from "../../assets/like.png";
import celebration from "../../assets/celebration.png";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import mind_blown from "../../assets/mind_blown.png";
import "./index.css";

const LikeModal = ({ modalOpen, setModalOpen, reactedUsers }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ALL');
    const [activeReaction,setActiveReaction] = useState(undefined);
    const [likes,setLikes] = useState(undefined);
    const [hearts,setHearts] = useState(undefined);
    const [celebrations,setCelebrations] = useState(undefined);
    const [mindBlowing,setMindBlowing] = useState(undefined);

    const handleTabClick = (reactionType) => {
        setActiveTab(reactionType);
        if(reactionType!='ALL')
            setActiveReaction(reactedUsers.filter(user => user.type == reactionType));
        else    
            setActiveReaction(reactedUsers);
    };

    useEffect(()=>{
        if(reactedUsers)
        {
            setActiveReaction(reactedUsers);
            setLikes(reactedUsers.filter( user => user.type=="Like"));
            setHearts(reactedUsers.filter( user => user.type=="Heart"));
            setCelebrations(reactedUsers.filter( user => user.type=="Celebration"));
            setMindBlowing(reactedUsers.filter( user => user.type=="Mind_Blowing"));
        }
    },[reactedUsers])

    const handleClick = (event,username)=>{
        event.stopPropagation();
        navigate(`/profile/${username}`);
    }

  return (
    <Modal
      title="Reactions"
      centered
      open={modalOpen}
      onOk={() => {
        setModalOpen(false);
        handleTabClick('ALL');
      }}
      onCancel={() => {
        setModalOpen(false);
        handleTabClick('ALL');
      }}
      footer={null}
    >
    <div className="main">
      <div className="your-modal-container">

        <div className="buttons">
          <button className={`button ${activeTab=='ALL' ? 'active' : ''}`} onClick={()=>handleTabClick("ALL")}>
            All {reactedUsers?.length}
          </button>
          {likes?.length>0 && <button className={`button ${activeTab=='Like' ? 'active' : '' }`} onClick={()=>handleTabClick("Like")}>
            <img src={like} className="icon" /> <span className="count">{likes?.length}</span>
          </button>}
          {hearts?.length>0 && <button className={`button ${activeTab=='Heart' ? 'active' : '' }`} onClick={()=>handleTabClick("Heart")}>
            <FcLike size={30}/> <span className="count">{hearts?.length}</span>
          </button>}
          {celebrations?.length>0 && <button className={`button ${activeTab=='Celebration' ? 'active' : '' }`} onClick={()=>handleTabClick("Celebration")}>
          <img src={celebration} className="icon" /> <span className="count">{celebrations?.length}</span>
          </button>}
          {mindBlowing?.length>0 && <button className={`button ${activeTab=='Mind_Blowing' ? 'active' : '' }`} onClick={()=>handleTabClick("Mind_Blowing")}>
            <img src={mind_blown} className="icon" /> <span className="count">{mindBlowing?.length}</span>
          </button>}
        </div>
      </div>
      <hr/>
      <StyledSuggestions>
      {activeReaction &&
          activeReaction.map((item, index) => (
            <StyledButton key={index} onClick={(e)=>handleClick(e,item?.user?.username)}>
              <img src={item?.user?.avatarImage} alt="Profile" />
              <div className="userName">{item?.user?.username}</div>
            </StyledButton>
          ))}
      </StyledSuggestions>
    </div>
    </Modal>
  );
};

export default LikeModal;

const StyledSuggestions = styled.div`
  max-height: 400px; /* Maximum height for the list of buttons before scroll bar appears */
  overflow-y: auto; /* Add scroll bar when needed */
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px; /* Increased padding for a larger button */
  border: none;
  background-color: transparent;
  cursor: pointer;
  width:470px;

  img {
    width: 40px; /* Increased image size */
    height: 40px;
    border-radius: 50%;
    margin-right: 15px; /* Increased margin for more spacing */
  }

  &:hover {
    background-color: #f0f0f0; /* Add your desired hover background color */
  }
`;