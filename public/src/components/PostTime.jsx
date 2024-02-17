import React from "react";

function PostTime({ timestamp }) {

    function timeAgo(timestamp) {
        const currentTime = new Date();
        const postTime = new Date(timestamp);
      
        const timeDifference = currentTime - postTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        if (seconds < 60) {
          return `${seconds} seconds ago`;
        } else if (minutes < 60) {
          return `${minutes} minutes ago`;
        } else if (hours < 24) {
          return `${hours} hours ago`;
        } else {
          return `${days} days ago`;
        }
      }

  const timeDifference = timeAgo(timestamp);

  return <span>{timeDifference}</span>;
}

export default PostTime;
