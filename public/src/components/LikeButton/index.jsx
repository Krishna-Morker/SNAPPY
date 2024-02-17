import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import { AiOutlineLike ,AiOutlineComment } from "react-icons/ai";
import like from "../../assets/like.png";
import celebration from "../../assets/celebration.png";
import mind_blown from "../../assets/mind_blown.png";
import { addReaction , removeReaction , addComments } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LikeModal from "../LikeModal";
import PostTime from "../PostTime";
import { FcLike } from "react-icons/fc";
import { BsShareFill } from "react-icons/bs";

export default function LikeButton({ currentUser, userId, postId , reactedUsers , setReactedUsers , comments , setComments}) {
  const [reactionCount, setReactionCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [reacted, setReacted] = useState(undefined);
  const [modalOpen,setModalOpen] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [commentsToShow, setCommentsToShow] = useState(3);
  const navigate = useNavigate();

  const handleReaction = async(reactionType ,e ) => {
      e.stopPropagation();
      const { data } =await axios.post(addReaction , { postId , userId , reactionType });
      let newReactedUsers = reactedUsers.filter(user => user.user._id!=userId);
      newReactedUsers = [{
                                user:{ 
                                 _id:currentUser?._id,
                                 username:currentUser?.username,
                                 avatarImage:currentUser?.avatarImage,
                                 headline:currentUser?.headline,
                                },
                                type:reactionType,
                            },...newReactedUsers];
      setReactedUsers(newReactedUsers);
  };

  useEffect(()=>{
    if(reactedUsers)
    {
        const user = reactedUsers.find( user => user.user._id==userId);
        setReacted(user?.type);
        setReactionCount(reactedUsers?.length);
        setCommentCount(comments?.length);
    }
  },[reactedUsers,comments])

  const eraseReaction = async(e) => {
      e.stopPropagation();
      const { data } =await axios.post(removeReaction , { postId , userId });
      const newReactedUsers = reactedUsers.filter(user => user.user._id!=userId);
      setReactedUsers(newReactedUsers);
  }

  const handleClick =() =>{
    if(reactionCount>0)
      setModalOpen(true);
  }

  const getComment = (event) => {
    setInputComment(event.target.value);
  };

  const addComment = async () => {
    const { data } =  await axios.post(addComments,{ postId,userId,inputComment,timeStamp : Date.now() });
    console.log(data);
    let  newComments = [{
                                user:{ 
                                 _id:currentUser?._id,
                                 username:currentUser?.username,
                                 avatarImage:currentUser?.avatarImage,
                                 headline:currentUser?.headline,
                                },
                                comment : inputComment,
                                timeStamp : Date.now(),
                            },...comments];
    setComments(newComments);
    setCommentsToShow(commentsToShow+1);
    setInputComment("");
  };

  const handleLoadMoreComments = () => {
    setCommentsToShow((prevCount) => prevCount + 10);
  };

  return (
    <div className="like-container">
        <LikeModal modalOpen={modalOpen} setModalOpen={setModalOpen} reactedUsers={reactedUsers} />
      <div className="reactions-comments-container">
        <p 
          className={`reactions ${reactionCount === 0 ? 'inactive' : ''}`} 
          onClick={handleClick}
        >
            {reactionCount} People reacted this Post
        </p>
        {commentCount>0 && 
          <span 
            className={`comments ${commentCount === 0 ? 'inactive' : ''}`} 
            onClick={()=>{
              if(!showCommentBox)
                setShowCommentBox(true)
              else
                handleLoadMoreComments();
              }
            }
          >
            {commentCount} Comments
          </span>}
      </div>
      <div className="hr-line">
        <hr />
      </div>
       <div className="like-comment">
        <div className="likes-comment-inner" onClick = {reacted ? eraseReaction : (e)=>handleReaction("Like",e)} >
          {reacted ? (
            <>
            {reacted === "Like" && <img src={like} className="icon" />}
            {reacted === "Heart" && <FcLike size={30} />}
            {reacted === "Celebration" && <img src={celebration} className="icon" />}
            {reacted === "Mind_Blowing" && <img src={mind_blown} className="icon" />}
            </>
          ) : (
            <AiOutlineLike size={30} />
          )}

          <p className={`black ${reacted ? reacted : ''}`} >{ reacted ? `${reacted}` : "Like"}</p>

          <div className="hover-icons">
            <img src={like} className="icon" onClick = {(e)=>handleReaction("Like",e)} size={30} />
            <FcLike className="icon" onClick = {(e)=>handleReaction("Heart",e)} size={30} />
            <img src={celebration} className="icon" onClick = {(e)=>handleReaction("Celebration",e)} size={30} />
            <img src={mind_blown} className="icon" onClick = {(e)=>handleReaction("Mind_Blowing",e)} />
          </div>

        </div>
        <div
          className="likes-comment-inner"
          onClick={() => {
            if(showCommentBox)
              setCommentsToShow(3);
            setShowCommentBox(!showCommentBox)
          }
          }
        >
          {
            <AiOutlineComment
              size={30}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }

          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
        <div
          className="likes-comment-inner"
        >
          <BsShareFill/><p className="share">  Share</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={inputComment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {commentCount > 0 ? (
            comments.slice(0, commentsToShow).map((comment) => {
              return (
                <>
                <div className="commenter-container">
                  <img src={comment.user.avatarImage} alt="profile" className="commenter-image" onClick={() => navigate(`/profile/${comment.user.username}`)}/>
                  <div className="all-comments">
                    <p className="name" onClick={()=>navigate(`/profile/${comment.user.username}`)}>{comment.user.username}</p>
                    <p className="headline" onClick={() => navigate(`/profile/${comment.user.username}`)}>
                    { 
                        comment?.user?.headline?.length > 50
                        ? `${comment.user.headline.substring(0, 50)}...`
                        : comment?.user?.headline
                    }
                    </p>
                    <p className="comment">{comment.comment}</p>
                    <p className="timestamp"><PostTime timestamp={comment.timeStamp} /></p>

                    {/* 
                    <p>•</p>
                  */}
                  </div>
                </div>
                </>
              );
            })
          ) : (
            <></>
          )}
          {comments.length > commentsToShow && (
            <button className="load-more-btn" onClick={handleLoadMoreComments}>
              Load More Comments
            </button>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
