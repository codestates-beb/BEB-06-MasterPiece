import { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import axios from "axios";

const MyFractionalNft = ({ baycUri, cryptoUri, maycUri }) => {
  const { account, myProfile } = useStore();
  const [myInfo, setMyInfo] = useState([]);

  useEffect(() => {
    getPieceNft();
  }, []);

  const getPieceNft = () => {
    axios.get(`http://localhost:3001/mypage/${account}`).then((res) => {
      setMyInfo(res.data);
      useStore.setState({ myProfile: res.data[0].profileUrl });
    });
  };

  // const handleProfile = () => {
  //   axios.post(`http://localhost:3001/mypage/${account}`, { profile });
  // };

  return (
    <div className="fractionalnft-box">
      {myInfo.map((a) => {
        return (
          <div className="frac-nft">
            <img
              className="frac-pic"
              src={a.collectionName === "Crypto Punks" ? cryptoUri : baycUri}
            />
            <div className="frac-des">
              <div className="frac-collection">
                <img src="Puzzle.jpg" />
                {a.collectionName}
              </div>
              <div className="frac-name">{a.nftName}</div>
              <div className="frac-profile-btn">Profile</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyFractionalNft;
