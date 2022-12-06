import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1, faUser } from "@fortawesome/free-regular-svg-icons";
import { useStore } from "../../../store/store";

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
          <Link to="/">
            <button>Home</button>
          </Link>

          <Link to="/mint">
            <button>Piece nft</button>
          </Link>
          <Link
            to="/community"
            onClick={() => {
              useStore.setState({ openCommunity: false });
            }}
          >
            <button>community</button>
          </Link>
          <Link to="/roadmap">
            <button>Roadmap</button>
          </Link>
          <Link to="/mypage">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link to="/connectwallet">
            <FontAwesomeIcon icon={faMoneyBill1} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
