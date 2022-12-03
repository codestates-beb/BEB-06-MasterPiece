import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contractStore, useStore } from "../../../store/store";
import MyNftList from "./MyNftList";
import MyFractionalNft from "./MyFractionalNft";
import EventMarket from "./EventMarket";
import Web3 from "web3";
import abi from "../../abi/erc1155optimizeABI"

function Mypage() {
  const { smAddress } = contractStore();
  const [myNft, setMyNft] = useState([]);
  const [clickOnnft, setClickOnnft] = useState(true);
  const [clickOnpiece, setClickOnpiece] = useState(false);
  const [clickOnevent, setClickOnevent] = useState(false);
  const [token, setToken] = useState(0)
  const { account } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    connectCheck();
    tokenBalance();
  }, []);

  const handleMenu1 = () => {
    setClickOnnft(true);
    setClickOnpiece(false);
    setClickOnevent(false);
  };
  const handleMenu2 = () => {
    setClickOnpiece(true);
    setClickOnnft(false);
    setClickOnevent(false);
  };
  const handleMenu3 = () => {
    setClickOnpiece(false);
    setClickOnnft(false);
    setClickOnevent(true);
  };
  const tokenBalance = async () => {
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(abi, smAddress)
    await contract.methods
      .erc20balance(account).call().then((res) => { setToken(res) })

  }
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
          style={{ textAlign: "center", fontSize: "20px", marginTop: "22px" }}
        >
          <p></p>
          <img className="copy-btn" src="copy.jpg" /> {token} POP
        </div>
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
        {/* <div className="mypage-gettoken">Get token</div> */}

      </div>
      {/* ///////////////////////////// nft box /////////////////////////////*/}
      <div className="mypage-nft-box">
        {clickOnnft ? (
          <MyNftList />
        ) : clickOnpiece ? (
          <MyFractionalNft />
        ) : (
          <EventMarket />
        )}
      </div>
    </div>
  );
}

export default Mypage;
