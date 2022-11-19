import { useState } from "react";

function Ranking() {
  const [ranking, SetRanking] = useState([1, 2, 3, 4, 5]);
  return (
    <div>
      <h1 style={{ marginLeft: "8%", fontFamily: "Roboto, sans-serif" }}>
        <img src="Puzzle.jpg"></img>TOP
      </h1>
      <div className="nft-ranking">
        <div className="nft-left">
          {ranking.map((a) => {
            return (
              <div style={{ marginBottom: "23px" }}>
                <div className="ranking-num">1</div>
                <img src="ranking.jpg" className="ranking-img"></img>{" "}
                <div className="ranking-name">CryptoPunks</div>
                <div className="ranking-FP">60.95 ETH</div>
                <div className="ranking-Volume">867 ETH</div>
              </div>
            );
          })}
        </div>
        <div className="nft-right">
          {ranking.map((a) => {
            return (
              <div style={{ marginBottom: "23px" }}>
                <div className="ranking-num">1</div>
                <img src="ranking.jpg" className="ranking-img"></img>{" "}
                <div className="ranking-name">CryptoPunks</div>
                <div className="ranking-FP">60.95 ETH</div>
                <div className="ranking-Volume">867 ETH</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
