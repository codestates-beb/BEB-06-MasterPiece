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
          <p className="footer-subscription-heading">PoP</p>
          <p className="pop-description">Piece of Puzzle</p>
          <p className="pop-description">
            The world’s first and largest digital marketplace for crypto
            collections and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>
        </div>

        <div className="footer-link-items">
          <h2>About us</h2>
          <p>Contact</p>
          <p>Support</p>
          <p>Destinations</p>
        </div>
        <div className="footer-link-items">
          <h2>About us</h2>
          <p>Contact</p>
          <p>Support</p>
          <p>Destinations</p>
        </div>
        <div className="footer-link-items">
          <h2>About us</h2>
          <p>Contact</p>
          <p>Support</p>
          <p>Destinations</p>
        </div>
        <div className="footer-link-items">
          <h2>About us</h2>
          <p>Contact</p>
          <p>Support</p>
          <p>Destinations</p>
        </div>
      </div>
      {/* <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <p className="social-logo">PoP</p>
          </div>
          <small className="website-rights">PoP © 2022</small>
          <div className="social-icons">
            <p className="social-icon-link facebook">facebook</p>
            <p className="social-icon-link twitter">twitter</p>
            <p className="social-icon-link twitter">github</p>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Footer;
