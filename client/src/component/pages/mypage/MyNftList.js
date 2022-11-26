import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store/store";
import axios from "axios";
import Web3 from "web3";

const MyNftList = () => {
  const [myNft, setMyNft] = useState([]);
  const { account } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    connectCheck();
  }, []);

  const connectCheck = () => {
    if (account == 0) {
      navigate("/connectwallet");
    }
  };

  const getMyNft = () => {
    try {
      axios
        .get(
          `https://testnets-api.opensea.io/api/v1/assets?owner=0x21AeB99d64c0762327c5D5d13Fd84794B506693f&order_direction=desc&offset=0&limit=20&include_orders=false`
        )
        .then((res) => {
          setMyNft(res.data.assets);
          console.log(myNft);
        });
    } catch (err) {
      console.log(err);
    }
  };
  //버튼 눌렀을 떄 sell기능 뭘 보내줘야 하는지 확인하고 가격 입력란 만들기
  // const handleSell = (e) => {
  //가격입력받는 모달창 , yes
  //     const number = e.target.value
  //     axios.post("http://localhost:8080/", {
  //         name: myNft[number].name
  //          id : myNft[number].token_id

  //     })
  // }
  useEffect(() => {
    getMyNft();
  }, []);

  return (
    <div>
      {myNft.map((a, idx) => {
        return (
          <div>
            <div>
              <img src={a.image_url}></img>
            </div>
            <div> </div>
            <div>{a.collection.name}</div>
            <div>{a.name}</div>
            <button value={idx}>Sell</button>
          </div>
        );
      })}
    </div>
  );
};
export default MyNftList;
