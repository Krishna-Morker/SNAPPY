import React, { useEffect, useState , useRef } from "react";
import "./index.css";
import PostsCard from "../PostsCard";
import FileUploadModal from "../FileUploadModal";
import axios from "axios";
import { HiOutlinePencil } from "react-icons/hi";
import { getProfilePost, getSignature , setAvatarImage } from "../../utils/APIRoutes";
import {addConnection} from "../../utils/APIRoutes"
import {checkConnection} from "../../utils/APIRoutes"
import {remConnection} from "../../utils/APIRoutes"

export default function ProfileCard( { onEdit , currentUser ,guestUser ,setCurrentUser } ){
    const [user,setUser] = useState(undefined);
    const [editButton,setEditButton] = useState(false);
    const [allPosts,setAllPosts] = useState(undefined);
    const [image, setImage] = useState(null);
    const [imgUrl,setImgUrl] = useState(undefined);
    const [modalOpen,setModalOpen] = useState(false);
    const [connected,isconnected]= useState(false);
    
    useEffect(async() => {
      if(guestUser!=undefined){
     
      const data=await axios.post(`${checkConnection}/${currentUser._id}`, { e:guestUser._id} );
     //   console.log(data);
       if(data.data==true){
        isconnected(true);
      }
    }
      },[user]);

      const remConn =async(e) => {
        const data= await axios.post(`${remConnection}/${currentUser._id}`, { e } );
        //console.log(data);
     isconnected(false);
      }

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    };

    const addConn =async (e) => {
      const data= await axios.post(`${addConnection}/${currentUser._id}`, { e } );
      //console.log(data);
   isconnected(true);
    }
  
    const uploadFile = async (type,timestamp,signature) => {
      const data = new FormData();
      data.append("file", image);
      data.append("timestamp",timestamp);
      data.append("signature",signature);
      data.append("api_key",process.env.REACT_APP_CLOUDINARY_API_KEY);
  
      try{
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const resourceType = type;
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  
        const res = await axios.post(api,data);
        const { secure_url } = res.data;
        return secure_url;
      }catch(error){
        console.log(error);
      }
    }
  
    const getSignatureForUpload = async (folder) => {
      try{
        const res = await axios.post(getSignature,{folder});
        return res.data;
      }catch(error){
        console.log(error);
      }
    }

    useEffect(async () =>{
      const response = await axios.post(setAvatarImage,{ imgUrl ,id:currentUser._id});
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(response.data)
        );
        setUser(response.data);
        setCurrentUser(response.data);
        setModalOpen(false);
        console.log(response.data);
    },[imgUrl])
  
    const handleUpload = async () => {
      try {
        if(image){
          setImage(null);
          const { timestamp:imgTimestamp, signature : imgSignature} = await getSignatureForUpload('images');
          const imgUrl = await uploadFile('image',imgTimestamp,imgSignature);
          setImgUrl(imgUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };


    useEffect(async () => {
      const fetchData = async () => {
        if(guestUser){
        const {data} = await axios.get(`${getProfilePost}/${guestUser._id}`);
        setAllPosts(data);
        }
      }

      fetchData();

    },[guestUser]);

    useEffect(async() => {
      if(guestUser)
      {
        setUser(guestUser);
      }
    },[guestUser]);
    
    useEffect(async() => {
      if(currentUser && guestUser)
      {
        if(currentUser._id===guestUser._id)
          setEditButton(true);
      }
    },[currentUser,guestUser]);

    return (
      <> 
        {
          editButton && 
          <FileUploadModal 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          handleImageChange={handleImageChange} 
          handleUpload={handleUpload}
          setImage={setImage} 
          image={image}/>
          }
        <div className="profile-card">
        
            <div className="edit-btn">
                 {editButton && <HiOutlinePencil className="edit-icon" onClick={onEdit} />}
            </div>
          <div className="profile-info">
            <div>
              <img className="profile-image" src={user ? user.avatarImage :process.env.REACT_APP_DEFAULT_AVATAR_IMAGE} onClick={()=>setModalOpen(true)}/>
              {user && <h3 className="userName">{user.username}</h3>}
              {user && user.headline && <p className="heading">{user.headline}</p>}
              
              {user && (editButton) ?  <></> : 
              ((connected) ? <button class="connected-button"  onClick={() => remConn(guestUser._id)} >Connected</button> : <button class="connect-button" onClick={() => addConn(guestUser._id) }>Connect</button>) }
              
              {user && (user.city || user.country) && (
                <p className="location">
                  {user.city && user.country
                    ? `${user.city}, ${user.country}`
                    : user.city || user.country }
                </p>
              )}

            {user && user.website && <a
              className="website"
              target="_blank"
              href={user.website}
            >
              {user.website}
            </a>}
            </div>

             <div className="right-info">
              {user && user.college && <p className="college">{user.college}</p>}
              {user && user.company && <p className="company">{user.company}</p>}
             </div>
          </div>
          {user && user.aboutMe && <p className="about-me">
            {user.aboutMe}
          </p>}

        {user && user.skills && <p className="skills">
          <span className="skill-label">Skills</span>:&nbsp;
          {user.skills}
        </p>}
      </div>
            <div className="post-status-main">
              {allPosts!==undefined && allPosts.map((posts) => {
                return (
                  <div key={posts.id}>
                    <PostsCard posts={posts} currentUser={currentUser} />
                  </div>
                );
              })}
            </div>
      </>
    );
}