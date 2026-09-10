import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import { cards, projects } from "../../data";

const categories = [["Vintage wear", "vintage clothing"], ["Home finds", "home decor"], ["Records", "vinyl records"], ["Rare books", "rare books"], ["Cameras", "retro cameras"], ["Collectibles", "collectibles"]];

function Home() {
  return (
    <main className="home">
      <Featured />
      <section className="category-strip" aria-label="Marketplace categories"><div className="section-inner">
        {categories.map(([label, query], index) => <Link key={label} to={`/gigs?search=${encodeURIComponent(query)}`}><span>0{index + 1}</span>{label}</Link>)}
      </div></section>
      <section className="editorial-section"><div className="section-inner">
        <div className="section-heading"><div><span className="kicker">Freshly unearthed</span><h2>Finds with a past</h2></div><Link to="/gigs">Shop all finds →</Link></div>
        <div className="story-grid">{cards.slice(0, 4).map((card, index) => <Link className={`story-card card-${index + 1}`} key={card.id} to={`/gigs?search=${encodeURIComponent(card.title)}`}><img src={card.img} alt={card.title} /><span>{card.desc}</span><h3>{card.title.replace(",", "")}</h3></Link>)}</div>
      </div></section>
      <section className="ai-studio"><div className="section-inner">
        <div className="ai-copy"><span className="kicker">Powered by taste, assisted by AI</span><h2>Describe the vibe.<br />We’ll find the piece.</h2><p>Search by era, mood, material, color, or an oddly specific memory. Scout turns natural language into a personal thrift edit.</p><Link to="/gigs?search=one-of-a-kind+vintage">Try Scout →</Link></div>
        <div className="prompt-window"><div className="window-bar"><span /><span /><span /><b>THRIFTU.SCOUT</b></div><div className="prompt-body"><small>YOUR PROMPT</small><p>“A camera that looks like it travelled across Europe in 1978.”</p><div className="thinking"><i /><span>Reading your taste...</span></div><div className="result-tags"><span>35mm</span><span>lived-in</span><span>under $120</span></div></div></div>
      </div></section>
      <section className="seller-section"><div className="section-inner">
        <div className="section-heading"><div><span className="kicker">People behind the pieces</span><h2>Meet the curators</h2></div><Link to="/register">Start selling →</Link></div>
        <div className="seller-grid">{projects.slice(0, 4).map((seller) => <Link to={`/gigs?search=${encodeURIComponent(seller.cat)}`} className="seller" key={seller.id}><img src={seller.img} alt={seller.cat} /><div><img src={seller.pp} alt="" /><span><strong>{seller.cat}</strong>{seller.username}</span></div></Link>)}</div>
      </div></section>
      <section className="impact-band"><div className="section-inner"><div><strong>12k+</strong><span>pieces recirculated</span></div><div><strong>4.8/5</strong><span>community rating</span></div><div><strong>1 of 1</strong><span>always more interesting</span></div></div></section>
    </main>
  );
}

export default Home;
