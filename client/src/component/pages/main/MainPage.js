import { useNavigate } from "react-router-dom";
import Ranking from "./Ranking";
import Gallery from "./Gallery";
import About from "./About";

function MainPage() {
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate("/connectwallet");
  };

  const handleMint = () => {
    navigate("/mint");
  };
  return (
    <div className="main">
      <div className="main-image">
        <div className="main-left">
          <h1>
            <span>Buy</span>, <span>sell</span> and <span>mint</span>
            <br /> fractions of NFTs
          </h1>
          <p>
            Fractional ownership of the world’s most sought after NFTs.
            <br />
            Fractional reduces entry costs, increases access, and enables new
            communities.
            <br />
            Also you can get SBT badge.
          </p>
          <div className="main-connect-btn">
            <span onClick={handleConnect}>Connect wallet</span>
            <span style={{ marginLeft: "3%" }} onClick={handleMint}>
              Mint now
            </span>
          </div>
        </div>
        <div className="main-right">
          <div>
            <span>1/100 ETH</span>
            <span style={{ marginTop: "12px", fontSize: "25px" }}>
              DEC 07 2022 OPEN 🎉
            </span>
          </div>
        </div>
      </div>
      <div className="arrow-box">
        <div className="s1_arrow">
          <div className="scroll-arrow"></div>
          <div className="scroll-arrow"></div>
          <div className="scroll-arrow"></div>
        </div>
      </div>
      <Ranking />
      <Gallery />
      <About />
    </div>
  );
}

export default MainPage;
