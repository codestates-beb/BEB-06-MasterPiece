import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        {/* <p className="footer-subscription-heading">PoP</p>
        <p className="footer-subscription-text">fractional nft</p> */}
        <div className="input-area">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
            ></input>
            <button className="sub-btn">Subscribe</button>
          </form>
        </div>
      </section>
      <div class="footer-links">
        <div className="pop-box">
          <p className="footer-subscription-heading">
            <img
              src="Puzzle.jpg"
              style={{ float: "left", height: "20px" }}
            ></img>
            PoP
          </p>
          <p
            className="pop-description"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            Piece of Puzzle
          </p>
          <p className="pop-description">
            The world’s first and largest digital marketplace for crypto
            collections and non-fungible tokens (NFTs).
          </p>
        </div>

        <div className="footer-link-items">
          <h2>Marketplace</h2>
          <a href="/">Mainpage</a>
          <a href="/market">Market</a>
          <a href="/mint">Fractional nft</a>
        </div>
        <div className="footer-link-items">
          <h2>Community</h2>
          <a href="/community">Main</a>
          <a href="/detail">Agenda</a>
          <a href="/write">Agenda write</a>
        </div>
        <div className="footer-link-items">
          <h2>My Account</h2>
          <a href="/mypage">Profile</a>
          <a href="/connectwallet">Connect wallet</a>
        </div>
        <div className="footer-link-items">
          <h2>About us</h2>
          <a href="https://github.com/codestates-beb/BEB-06-MasterPiece">
            Github
          </a>
          <a href="/roadmap">Roadmap</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
