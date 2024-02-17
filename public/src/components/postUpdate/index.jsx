import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import ModalComponent from "../Post_Modal";
import media from "../../assets/media.png";
import job from "../../assets/job.png";
import article from "../../assets/article.png";
import { sendPostRoute,getAllPost } from "../../utils/APIRoutes";
import PostsCard from "../PostsCard";

export default function PostStatus( {currentUser } ) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPosts,setAllPosts] = useState(undefined);
  const [currentUserImage,setCurrentUserImage] = useState(undefined);


  useEffect(async () => {
    const fetchData = async () => {
      if(currentUser)
      {
        const {data} = await axios.get(`${getAllPost}/${currentUser._id}`);
        setAllPosts(data);
        setCurrentUserImage(currentUser.avatarImage);
      }
    }

    fetchData();

  },[currentUser]); //aama jyare currentUser hatavi daiye to ek pan posts na batave
                    // because jyare currentuser undefined hashe tyare badhama pass
                    // thay component render thay jashe ane tyare setallpost pan 
                    //chali jashe ane ek pan post backend mathi nai aave because
                    // currentuser._id undefined chhe ane jyare currentuser ne 
                    // ani value mali jaay tyare component badha farithi render
                    // thay pan useEffect ke useState na thay because a mount vakhate
                    // j chale and pachhi kaayam post undefined j raheshe and 
                    // component renrender time a post undefined na karane ek pan
                    // post nai dekhay same vastu bija badha component ma pan dhyan rakhavi
                    // pade............................

  const sendStatus = async () => {
    const response= await axios.post(`${sendPostRoute}/${currentUser._id}`,{
      status,
    });
  //   setAllPosts((prevPosts) => [
  //     response.data.post ,
  //    ...prevPosts,
  //  ]);
    await setModalOpen(false);
    await setStatus(""); 
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="post-status-main">
      <div className="post-status">
        <img
          src={currentUserImage}
          alt="User"
          className="user-image"
          onClick={()=>navigate(`/profile/${currentUser.username}`)}
        />
        <button className="open-post-modal" onClick={openModal}>
          Start a Post
        </button>
        {modalOpen && 
          <ModalComponent
          setStatus={setStatus}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          status={status}
          sendStatus={sendStatus}
        />
        }

        <div className="additional-buttons">
          <button className="additional-button">
            <img src={media} alt="" className="icon"/>Media
          </button>
          <button className="additional-button">
            <img src={job} alt="" className="icon"/>Job
          </button>
          <button className="additional-button">
            <img src={article} alt="" className="icon"/>Write article
          </button>

        </div>
      </div>

      <div>
        {allPosts!==undefined && allPosts.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} currentUser={currentUser} />
            </div>
          );
        })}
      </div>

    </div>
  );
}
