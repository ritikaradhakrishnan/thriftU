import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
        <div className="item">
          <h1>Discover Unique Finds at Unbeatable Prices</h1>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Treasures for Every Budget
          </div>
          <p>
            Explore a wide range of items at all price points. Enjoy the thrill of thrift without breaking the bank.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Quality Finds, Quick Shopping
          </div>
          <p>
            Dive into a selection of quality pre-loved items and discover your next treasure in minutes.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Satisfaction with Every Purchase
          </div>
          <p>
            Shop with confidence. Our commitment to quality ensures you love every item you find.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Friendly Assistance Anytime
          </div>
          <p>
            Our team is here to help you find what you're looking for, making your thrift store experience enjoyable and effortless.
          </p>
        </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Vintage Goods</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />
              <div className="line"></div>

              <span>Digital Collectibles</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Rare Books</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Flim Reels</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Music Players</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Refurbished Tech</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Small Business</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Book Collections</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Rare Cameras</span>
            </div>
          </div>
        </div>
      </div>
      <div className="features dark">
  <div className="container">
    <div className="item">
      <h1>
        ThriftU <i>Business</i>
      </h1>
      <h1>
        Sustainable Solutions Designed for <i>People</i>
      </h1>
      <p>
        Elevate your business with eco-friendly choices. Enjoy a curated thrift experience with benefits tailored for business clients.
      </p>
      <div className="title">
        <img src="./img/check.png" alt="" />
        Personalized Assistance for Bulk Buys
      </div>
      <p>
        Get help from our experienced team to select the best items in bulk, tailored to your business style and needs.
      </p>
      <div className="title">
        <img src="./img/check.png" alt="" />
        Cost-Effective Shopping, Corporate Responsibility
      </div>
      <p>
        Save on expenses while demonstrating your commitment to sustainability and corporate social responsibility.
      </p>
      <button>Explore ThriftU Business</button>
    </div>
    <div className="item">
      <img
        src="img/hq720.jpeg"
        alt="Thrift Store Interior"
      />
    </div>
  </div>
</div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
