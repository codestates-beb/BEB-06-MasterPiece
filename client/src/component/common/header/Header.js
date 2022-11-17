import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="menu">
        <Link to="/">
          <div className="logo">
            <img src="Puzzle.jpg" style={{ marginBottom: "7px" }}></img>PoP
          </div>
        </Link>
        <div className="menu-btn">
          <button>
            <Link to="/market">Market</Link>
          </button>
          <button>NFT</button>
          <button>NFT</button>
          <button>NFT</button>
          <button>
            <Link to="/agenda">Agenda</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
