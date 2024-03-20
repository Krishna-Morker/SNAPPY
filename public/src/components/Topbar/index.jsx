import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import app_logo from "../../assets/app_logo.png";
import axios from 'axios';
import Logout from "../Logout";
import SearchModal from "../Search_Modal";
import { Link, useLocation } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SearchUsers } from '../../utils/APIRoutes';
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase, BsFront } from "react-icons/bs";
import "./index.css";

export default function Topbar( { currentUser } ) {
  const [currentUserImage,setCurrentUserImage] = useState(undefined);
  const [modalOpen,setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }; 

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function handleNavAndClose() {
    handleMenuClose();
  }

  useEffect(() => {
    const fetchData = async () => {
      if(currentUser)
      {
        const response = await axios.get(`${SearchUsers}/${currentUser._id}`, { params: { query: query } });
        setFilteredData(response.data);
      }
    };
    fetchData();
  }, [query,currentUser]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  const handleButtonClick = (name) => {
    setModalOpen(false);
    navigate(`/profile/${name}`);
    setQuery('');
  };

  useEffect(async () => {
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  return (
    <div className="topbar-main">
      <div className="react-icons">
      <img src={app_logo} alt="app_logo" className="app-logo" onClick={()=>navigate("/home")}/>
        <div className="icon-container">
          <AiOutlineSearch onClick={()=>setModalOpen(true)} size={30} className="react-icon" />
            <SearchModal 
              modalOpen={modalOpen} 
              setModalOpen={setModalOpen} 
              query={query} 
              setQuery={setQuery}
              filteredData={filteredData }
              handleInputChange={handleInputChange}
              handleButtonClick={handleButtonClick}
            />
          <span className="icon-name">Search</span>
        </div>
        <div className="icon-container">
            <AiOutlineHome size={30} className="react-icon" onClick={()=>navigate("/home")}/>
          <span className="icon-name">Home</span>
        </div>

        <div className="icon-container">
          <AiOutlineUserSwitch size={30} className="react-icon" onClick={handleMenuOpen} />
          <span className="icon-name">Connections</span>
        </div> 

        <Menu
        
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/connections/connection"
                >
                  Connection
                </MenuItem>
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/connections/addfriend"
                >
                  Add friend
                </MenuItem>
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/pending"
                >
                  New Request
                </MenuItem>
              </Menu>
        {/* <div className="icon-container">
          <AiOutlineUserSwitch size={30} className="react-icon" onClick={()=>navigate("/connections")} />
          <span className="icon-name">Connections</span>
        </div> */}
        <div className="icon-container">
          <BsBriefcase size={30} className="react-icon" />
          <span className="icon-name">Jobs</span>
        </div>
        <div className="icon-container">
            <AiOutlineMessage size={30} className="react-icon" onClick={()=>navigate("/chat")}/>
          <span className="icon-name">Message</span>
        </div>
        <div className="icon-container">
          <AiOutlineBell size={30} className="react-icon" />
          <span className="icon-name">Notification</span>
        </div>
        <div className="icon-container">
          <img className="user-logo" src={currentUserImage} alt="user" onClick={()=>navigate(`/profile/${currentUser.username}`)}/>
          <span className="icon-name">Profile</span>
        </div>
        <Logout />
      </div>
    </div>
  );
}
