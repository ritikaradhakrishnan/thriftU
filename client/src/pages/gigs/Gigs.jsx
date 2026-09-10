import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { gigs as curatedGigs } from "../../data";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchTerm = params.get("search") || "";

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: () =>
      newRequest
        .get(
          `/gigs?${params.toString()}&min=${minRef.current?.value || ""}&max=${maxRef.current?.value || ""}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Marketplace / Curated finds</span>
        <h1>{searchTerm ? `Results for “${searchTerm}”` : "Vintage, rare, and worth finding"}</h1>
        <p>One-of-one pieces selected by independent sellers and thriftU Scout.</p>
        <div className="menu">
          <div className="left">
            <span>Price</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="catalog-message">Scout is checking the racks...</div>
          ) : (error || !data?.length) ? (
            <>
              <div className="offline-note"><strong>Scout’s curated edit</strong><span>Live inventory will appear when the marketplace service is connected.</span></div>
              {curatedGigs.map((gig) => <GigCard key={gig.id} item={{ ...gig, isLocal: true, _id: gig.id }} />)}
            </>
          ) : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
