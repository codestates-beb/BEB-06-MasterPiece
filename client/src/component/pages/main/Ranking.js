import { useEffect, useState } from "react";
import { rankingDummy } from "../../common/dummy/dummydata";
import axios from "axios";

function Ranking() {
  const [ranking, SetRanking] = useState(rankingDummy);
  // const [url, setUrl] = useState([])
  // const [volume, setVoulme] = useState([]);
  // const [fp, setFP] = useState([])
  // useEffect(() => {

  // if (ranking != []) {
  //   return;
  // } else {
  //   getNft();
  // }
  //   getNft();
  // }, []);
  useEffect(() => {
    // if (ranking != []) {
    //   return;
    // } else {
    //   getNft();
    // }
  }, [ranking]);

  // function getNft() {
  //   axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/nfts/list?order=market_cap_usd_desc&per_page=10&page=1",
  //       { headers: { "Content-Type": "application/json" } }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       SetRanking(res.data); //
  //     })
  // }
  // function getPrice() {
  //   let arr = [];
  //   for (let i = 0; i < ranking.length; i++) {
  //     arr.push(ranking[i].id);
  //     console.log(arr[i]);
  //   }
  //   let image = []
  //   for (let i = 0; i < arr.length; i++) {
  //     axios
  //       .get(`https://api.opensea.io/api/v1/collection/${arr[i]}`, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .then((res) => {
  //         image.push(res.data.collection.image_url);
  //         console.log(image)
  //         set
  //         setVoulme(res.data.collection.stats.one_day_volume);
  //         setFP(res.data.collection.stats.floor_price)

  //       });
  //   }
  // }

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
                <img className="ranking-img" src={a.profile}></img>{" "}
                <div className="ranking-name">{a.collectionname}</div>
                <div className="ranking-chk"></div>
                <div className="ranking-FP">{a.floorprice} ETH</div>
                <div className="ranking-Volume">{a.volume} ETH</div>
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
                <img className="ranking-img" src={a.profile}></img>{" "}
                <div className="ranking-name">{a.collectionname}</div>
                <div className="ranking-chk"></div>
                <div className="ranking-FP">{a.floorprice} ETH</div>
                <div className="ranking-Volume">{a.volume} ETH</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
