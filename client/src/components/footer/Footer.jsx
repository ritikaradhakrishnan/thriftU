import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-lead">
          <Link className="footer-logo" to="/">thriftU<span>.</span></Link>
          <p>Good objects deserve another chapter.</p>
        </div>
        <nav aria-label="Footer navigation">
          <div><strong>Explore</strong><Link to="/gigs">All finds</Link><Link to="/gigs?search=vintage+clothing">Vintage wear</Link><Link to="/gigs?search=home+decor">Home finds</Link></div>
          <div><strong>Community</strong><Link to="/register">Join thriftU</Link><Link to="/register">Become a seller</Link><Link to="/login">Sign in</Link></div>
          <div><strong>Smart search</strong><Link to="/gigs?search=curated+vintage">Ask Scout</Link><Link to="/gigs?search=one-of-a-kind">One-of-one finds</Link><Link to="/gigs?search=sustainable">Sustainable picks</Link></div>
        </nav>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} thriftU</span><span>Buy less. Choose better. Keep it moving.</span></div>
      </div>
    </footer>
  );
}

export default Footer;
