import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const isLocal = item.isLocal;
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
    enabled: !isLocal,
  });
  return (
    <Link to={isLocal ? `/gigs?search=${encodeURIComponent(item.desc)}` : `/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover || item.img} alt={item.desc} />
        <div className="info">
          {isLocal ? (
            <div className="user">
              <img src={item.pp || "/img/noavatar.png"} alt="" />
              <span>{item.username}</span>
            </div>
          ) : isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.png"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {isLocal ? item.star : (!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber))}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>{isLocal ? "CURATED PRICE" : "STARTING AT"}</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
