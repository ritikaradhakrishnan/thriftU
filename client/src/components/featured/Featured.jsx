import React, { useState } from "react";
import "./Featured.scss";
import { Link, useNavigate } from "react-router-dom";

const suggestions = ["90s denim under $60", "retro cameras", "art deco decor"];

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event?.preventDefault();
    const query = input.trim();
    navigate(query ? `/gigs?search=${encodeURIComponent(query)}` : "/gigs");
  };

  return (
    <section className="featured">
      <div className="featured-media" aria-hidden="true" />
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow">Curated secondhand marketplace</span>
          <h1>thriftU</h1>
          <p className="hero-line">Old things. New obsessions.</p>
          <p className="hero-description">
            Find one-of-one fashion, objects, and stories worth keeping in circulation.
          </p>
          <form className="search" onSubmit={handleSubmit}>
            <div className="searchInput">
              <img src="/img/search.png" alt="" />
              <input type="search" value={input} placeholder="Describe what you are hunting for" aria-label="Search the marketplace" onChange={(event) => setInput(event.target.value)} />
            </div>
            <button type="submit">Find it</button>
          </form>
          <div className="popular" aria-label="Popular searches">
            {suggestions.map((suggestion) => (
              <button type="button" key={suggestion} onClick={() => navigate(`/gigs?search=${encodeURIComponent(suggestion)}`)}>{suggestion}</button>
            ))}
          </div>
        </div>

        <aside className="ai-finder">
          <div className="ai-finder-head">
            <span className="ai-mark">AI</span>
            <div><strong>thriftU Scout</strong><span>Visual taste matcher</span></div>
            <i>online</i>
          </div>
          <p>“I found pieces with the worn-in character you described.”</p>
          <div className="match-row"><span>Style match</span><strong>94%</strong></div>
          <div className="match-meter"><span /></div>
          <Link to="/gigs?search=curated+vintage" className="ai-link">Open your edit <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </section>
  );
}

export default Featured;
