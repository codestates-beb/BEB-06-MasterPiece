import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1, faUser } from "@fortawesome/free-regular-svg-icons";

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
          <Link to="/market">
            <button>Market</button>
          </Link>

          <button>NFT</button>
          <button>NFT</button>
          <button>NFT</button>
          <Link to="/agenda">
            <button>Agenda</button>
          </Link>
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faMoneyBill1} />
        </div>
      </div>
    </div>
  );
}

export default Header;
