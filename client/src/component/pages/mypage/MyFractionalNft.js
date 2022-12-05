import { useState } from "react";
import axios from "axios";

const MyFractionalNft = () => {
  const [myInfo, setMyInfo] = useState([
    { profile: "", collectionname: "Bored Ape Yacht Club", nftname: "#1055" },
  ]);

  //TODO: api 완성 되면 axios
  // const getPieceNft = () => {
  //   axios.get(`http://localhost:3001/mypage/${account}`).then((res) => {
  //     setMyInfo(res.data);
  //   });
  // };

  return (
    <div className="fractionalnft-box">
      {myInfo.map((a) => {
        return (
          <div className="frac-nft">
            <img className="frac-pic" src="gallery1.jpg" />
            <div className="frac-des">
              <div>{a.collectionname}</div>
              <div>{a.nftname}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyFractionalNft;
