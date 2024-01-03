import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Vintage Clothing</span>
            <span>Collectibles and Antiques</span>
            <span>Records and CDs</span>
            <span>Art and Decor</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on thriftU</span>
            <span>Buying on thriftU</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Blog</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
          </div>
          <div className="item">
            <h2>More From thriftU</h2>
            <span>About Owner</span>
            <span>Owner GitHub</span>
            <span>Owner Website</span>
            <span>thriftU Pro</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>thriftU</h2>
            <span>© thriftU International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
