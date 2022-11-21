import { useState } from "react";

function Ranking() {
  const [ranking, SetRanking] = useState([1, 2, 3, 4, 5]);
  const [ranking2, SetRanking2] = useState([6, 7, 8, 9, 10]);
  return (
    <div>
      <h1 style={{ marginLeft: "8%", fontFamily: "Roboto, sans-serif" }}>
        <img src="Puzzle.jpg"></img>TOP
      </h1>
      <div className="nft-ranking">
        <div className="nft-left">
          <div className="ranking-title">
            COLLECTION
            <a style={{ float: "right", marginRight: "3px" }}>FLOOR PRICE</a>
            <a style={{ float: "right", marginRight: "56px" }}>VOLUME</a>
          </div>

          {ranking.map((a, idx) => {
            return (
              <div className="ranking">
                <div className="ranking-num">{ranking[idx]}</div>
                <img src="ranking.jpg" className="ranking-img"></img>{" "}
                <div className="ranking-name">CryptoPunks</div>
                <div className="ranking-chk"></div>
                <div className="ranking-FP">60.95 ETH</div>
                <div className="ranking-Volume">867 ETH</div>
              </div>
            );
          })}
        </div>
        <div className="nft-right">
          <div className="ranking-title">
            {" "}
            COLLECTION
            <a style={{ float: "right", marginRight: "3px" }}>FLOOR PRICE</a>
            <a style={{ float: "right", marginRight: "56px" }}>VOLUME</a>
          </div>
          {ranking.map((a, idx) => {
            return (
              <div className="ranking">
                <div className="ranking-num">{ranking2[idx]}</div>
                <img src="ranking.jpg" className="ranking-img"></img>{" "}
                <div className="ranking-name">Bored Ape Yacht Club </div>
                <div className="ranking-chk"></div>
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
