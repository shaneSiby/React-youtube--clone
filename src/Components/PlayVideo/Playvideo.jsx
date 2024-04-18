import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, valueConverter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";
const Playvideo = () => {

const {videoId} = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubscribe = () => {
    if (isLoggedIn) {
      // User is logged in, perform subscription logic here
      console.log("Subscribe logic goes here");
    } else {
      // User is not logged in, show message
      alert("You can't subscribe as you are not logged in.");
    }
  };

  const fetchVideoData = async () => {
    //! fetching video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    //! fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id= ${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url).then((res) =>
      res.json().then((data) => setChannelData(data.items[0]))
    );
    //! fetch comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);
  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted>{" "}</video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="no-referrer"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? valueConverter(apiData.statistics.viewCount) : "33K"} Views
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}{" "}
        </p>

        <div>
          <span>
            <img src={like} alt="like" />
            {apiData ? valueConverter(apiData.statistics.likeCount) : "333"}
          </span>
          <span>
            <img src={dislike} alt="like" />
          </span>
          <span>
            <img src={share} alt="like" />
            share
          </span>
          <span>
            <img src={save} alt="like" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {" "}
            {channelData
              ? valueConverter(channelData.statistics.subscriberCount)
              : "0T"}{" "}
          </span>
        </div>
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>
          {" "}
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "video description "}{" "}
        </p>
        <p>
          Create YouTube Clone Using React JS | Build Complete Website Like
          YouTube In React JS 2024
        </p>
        <hr />
        <h4>
          {apiData ? valueConverter(apiData.statistics.commentCount) : "333"}
        </h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>1 day ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {valueConverter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playvideo;
