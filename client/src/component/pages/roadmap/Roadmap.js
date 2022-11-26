import { useNavigate } from "react-router-dom";

function Roadmap() {
  const navigate = useNavigate();

  const handleMint = () => {
    navigate("/mint");
  };
  return (
    <div>
      <h1 className="roadmap-title">Road Map for Piece of Nft</h1>
      <div className="timeline-container">
        <div className="timeline-item">
          <div className="timeline-item-content">
            <div>
              <img
                className="roadmap-img"
                src="https://img.seadn.io/files/1b6dede07cf376821d625079a7bf695a.png?fit=max&w=1000"
              ></img>
            </div>
            <span className="tag" style={{ background: "#949494a1" }}>
              Finished
            </span>
            <span>#1123</span>
            <p style={{ color: "#d1d1d1" }}>Bored Ape Yacht Club</p>
            <time>November 03 2022</time>

            <span className="circle" />
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-item-content">
            <div>
              <img
                className="roadmapnow-img"
                src="https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000"
              ></img>
            </div>
            <span className="tag" style={{ background: "#ef79d3b0" }}>
              In progress
            </span>
            <span>#2658</span>
            <p style={{ fontSize: "31px" }}>Crypto Punks</p>
            <time style={{ color: "white" }}>December 05 2022</time>
            <div style={{ width: "150px" }}>
              <button className="roadmap-mint-btn" onClick={handleMint}>
                Go to mint
              </button>
            </div>
            <span className="circle" />
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-item-content">
            <div>
              <img
                className="roadmap-img"
                src="https://img.seadn.io/files/2459c64c944c29323c7ba3dd41f792b6.png?fit=max&w=1000"
              ></img>
            </div>
            <span className="tag" style={{ background: "#93afa8" }}>
              coming soon
            </span>
            <span>#29325</span>
            <p style={{ color: "#d1d1d1" }}>Mutant Ape Yacht Club</p>
            <time>January 11 2023</time>

            <span className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
