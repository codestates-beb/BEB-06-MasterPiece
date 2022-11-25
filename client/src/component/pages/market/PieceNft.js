import { useState } from "react";

function PieceNft() {
  const [nftList, setNftList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [viewMore, setViewMore] = useState(false);
  const nftListFirst = nftList.slice(0, 10); //첫 화면에서는 10개의 nftlist만

  //db axios

  //   const getNftList = () => {
  //     axios.get('http://localhost:8080/buynft').then((result)=>{
  //         setNftList(result.data);
  //     })
  //   }

  const handleViewMore = () => {
    setViewMore(true);
  };

  return (
    <div>
      {viewMore ? (
        <div>
          {" "}
          <div className="container">
            {nftList.map((a) => {
              return (
                <div className="nft">
                  <div className="nft-img">
                    <img
                      src="gallery2.jpg"
                      style={{ borderRadius: "10px", width: "100%" }}
                    ></img>
                  </div>
                  <div className="nft-des">
                    <div style={{ fontSize: "19px" }}>Bored Ape Yacht Club</div>
                    <div>#1055</div>
                    <div style={{ color: "tomato" }}>
                      0.013 ETH <div className="buy-btn">Buy</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <div className="container">
            {nftListFirst.map((a) => {
              return (
                <div className="nft">
                  <div className="nft-img">
                    <img
                      src="gallery2.jpg"
                      style={{ borderRadius: "10px", width: "100%" }}
                    ></img>
                  </div>
                  <div className="nft-des">
                    <div style={{ fontSize: "19px" }}>Bored Ape Yacht Club</div>
                    <div>#1055</div>
                    <div style={{ color: "tomato" }}>
                      0.013 ETH <div className="buy-btn">Buy</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="viewmore" onClick={handleViewMore}>
            View More
          </div>
        </div>
      )}
    </div>
  );
}

export default PieceNft;
