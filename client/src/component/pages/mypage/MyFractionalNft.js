import { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import axios from "axios";

const MyFractionalNft = ({ baycUri, cryptoUri, maycUri }) => {
  const { account } = useStore();
  const [myInfo, setMyInfo] = useState([]);
  const [clickImg, setClickImg] = useState("");

  useEffect(() => {
    getPieceNft();
  }, []);

  const getPieceNft = () => {
    axios.get(`http://localhost:3001/mypage/${account}/all`).then((res) => {
      setMyInfo(res.data);
    });
  };

  const handleProfile = (e) => {
    setClickImg(e.target.id);
    console.log(e.target.id);
    axios
      .post(
        `http://localhost:3001/mypage/${account}`,
        { profileUrl: e.target.id },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        alert("프로필 수정 완료");
      });
  };

  return (
    <div className="fractionalnft-box">
      {myInfo.map((a) => {
        return (
          <div className="frac-nft">
            <img className="frac-pic" src={a.profile_url} />
            <div className="frac-des">
              <div className="frac-collection">
                <img src="Puzzle.jpg" />
                {a.collection_name}
              </div>
              <div className="frac-name">{a.nft_name}</div>
              <div
                className="frac-profile-btn"
                id={a.profile_url}
                onClick={handleProfile}
              >
                Profile
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyFractionalNft;
