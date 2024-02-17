import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import PostTime from "../PostTime";
import LikeButton from "../LikeButton";
import "./index.css";

export default function PostsCard({ posts ,currentUser}) {
  const [reactedUsers , setReactedUsers] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const navigate = useNavigate();
  useEffect(()=>{
    setReactedUsers(posts.reactions);
    setComments(posts.comments);
  }
  ,[]);
  return (
    <div className="posts-card">
      <div className="post-image-wrapper" onClick={() => navigate(`/profile/${posts.user.username}`) }>
        <img
          alt="profile-image"
          className="post-image"
          src={posts.user.avatarImage}
        />
        <div>
          <p className="name">
            {posts.user.username}
          </p>
          <p className="headline">
          { 
              posts?.user?.headline?.length > 50
              ? `${posts.user.headline.substring(0, 50)}...`
              : posts?.user?.headline
          }
          </p>
          <p className="timestamp"><PostTime timestamp={posts.createdAt} /></p>
        </div>
      </div>
      <p className="status">{posts.description}</p>
      <LikeButton currentUser={currentUser} userId={currentUser?._id} postId={posts._id} reactedUsers={reactedUsers} setReactedUsers={setReactedUsers} comments={comments} setComments={setComments}/>
    </div>
  
  )
}