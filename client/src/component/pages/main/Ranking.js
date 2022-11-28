import { useEffect, useState } from "react";
import axios from "axios";

function Ranking() {
  const [ranking, SetRanking] = useState([]);
  useEffect(() => {
    // if (ranking != []) {
    //   return;
    // } else {
    //   getNft();
    // }
    getNft();
  }, []);
  function getNft() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/nfts/list?order=market_cap_usd_desc&per_page=10&page=1",
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        SetRanking(res.data); //
        let arr = [];
        for (let i = 0; i < ranking.length; i++) {
          arr.push(ranking[i].id);
          console.log(arr[i]);
        }

        for (let i = 0; i < arr.length; i++) {
          axios
            .get(`https://api.opensea.io/api/v1/collection/${arr[i]}/stats`, {
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              console.log(res.data.stats);
            });
        }
      });
  }

  return (
    <div>
      <h1
        style={{
          marginTop: "22%",
          marginLeft: "8%",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <img src="Puzzle.jpg"></img>TOP
      </h1>
      <div className="nft-ranking">
        <div className="nft-left">
          <div className="ranking-title">
            COLLECTION
            <a style={{ float: "right", marginRight: "3px" }}>FLOOR PRICE</a>
            <a style={{ float: "right", marginRight: "56px" }}>VOLUME</a>
          </div>

          {ranking.slice(0, 5).map((a, idx) => {
            return (
              <div className="ranking">
                <div className="ranking-num">{idx + 1}</div>
                <img src="ranking.jpg" className="ranking-img"></img>{" "}
                <div className="ranking-name">{a.name}</div>
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
          {ranking.slice(5, 10).map((a, idx) => {
            return (
              <div className="ranking">
                <div className="ranking-num">{idx + 6}</div>
                <img src="ranking.jpg" className="ranking-img"></img>{" "}
                <div className="ranking-name">{a.name}</div>
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
