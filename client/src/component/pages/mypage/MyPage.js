import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/store";
import MyNftList from "./MyNftList";
import MyFractionalNft from "./MyFractionalNft";
import EventMarket from "./EventMarket";

function Mypage() {
  const [myNft, setMyNft] = useState([]);
  const [clickOnnft, setClickOnnft] = useState(true);
  const [clickOnpiece, setClickOnpiece] = useState(false);
  const [clickOnevent, setClickOnevent] = useState(false);
  const { account } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    connectCheck();
  }, []);

  const handleMenu1 = () => {
    setClickOnnft(true);
    setClickOnpiece(false);
    setClickOnevent(false)
  };
  const handleMenu2 = () => {
    setClickOnpiece(true);
    setClickOnnft(false);
    setClickOnevent(false)
  };
  const handleMenu3 = () => {
    setClickOnpiece(false);
    setClickOnnft(false);
    setClickOnevent(true);
  };

  const connectCheck = () => {
    if (account == 0) {
      navigate("/connectwallet");
    }
  };

  return (
    <div className="mypage-box">
      {/* ///////////////////////// propfile box /////////////////////////*/}
      <div className="mypage-profile-box">
        <img src="profile.jpg" className="mypage-nft-pic" />{" "}
        {account == 0 ? (
          0
        ) : (
          <h3 className="mypage-account">
            {" "}
            {account.slice(0, 6)}...{account.slice(-3)}&nbsp;
            <img className="copy-btn" src="copy.jpg" />
          </h3>
        )}
        <div
          className={clickOnnft ? "click-menu" : "mypage-menu1"}
          onClick={handleMenu1}
        >
          MY NFT
        </div>
        <div
          className={clickOnpiece ? "click-menu" : "mypage-menu2"}
          onClick={handleMenu2}
        >
          MY PIECE OF NFT
        </div>
        <div
          className={clickOnevent ? "click-menu" : "mypage-menu3"}
          onClick={handleMenu3}
        >
          EVENT MARKET
        </div>
      </div>
      {/* ///////////////////////////// nft box /////////////////////////////*/}
      <div className="mypage-nft-box">
        {clickOnnft ? <MyNftList /> : (clickOnpiece ? <MyFractionalNft /> : <EventMarket />)}
      </div>
    </div>
  );
}

export default Mypage;
