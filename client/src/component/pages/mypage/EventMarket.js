import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { useStore, contractStore } from "../../../store/store";
import abi from "../../abi/erc1155optimizeABI";
import { SoulModals } from "../../common/Modals/Modals";

const EventMarket = () => {
  const [eventNft, setEventNft] = useState([]);
  const [soul, setSoul] = useState(false);
  const [soulModal, setSoulModal] = useState(false); //modal
  const CryptoPunks = 0; //tokenId bayc: 1, mayc:2
  const { smAddress } = contractStore();
  const { account } = useStore();
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, smAddress);
  //address를 컨트랙에 조회해서 tokenId =0이면 입장 불가
  //true면 render
  //개인 address가 중앙용으로 만들어진거라 특정 아이디 query로 이벤트 마켓 꾸리면됨.
  //token pop 으로 구매가능하게 만들어야한다.
  const soulhandle = async () => {
    let souls = [];
    for (let i = 0; i < 3; i++) {
      const soulcheck = await contract.methods
        .soulBalanceOf(i, account) //crypto punks 에 대한 soul
        .call()
        .then((res) => {
          souls[i] = res;
        });
    }
    if (souls.includes("1")) {
      setSoul(true);
    } else {
      setSoulModal(true);
    }
  };
  const handleBuy = async () => {};
  const getMyNft = () => {
    try {
      axios
        .get(
          `https://testnets-api.opensea.io/api/v1/assets?owner=0xc1eb3DCCB66050981c2aF930B142d778eE187a88&order_direction=desc&offset=0&limit=20&include_orders=false`
        )
        .then((res) => {
          setEventNft(res.data.assets);
          console.log(eventNft);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    soulhandle();

    getMyNft();
  }, []);

  return (
    <div className="fractionalnft-box">
      {soulModal && <SoulModals />}
      {soul ? (
        <div>
          {eventNft.map((a, idx) => {
            return (
              <div className="event-nft">
                <img className="event-pic" src={a.image_url} />
                <div className="frac-des">
                  <div>{a.collection.name}</div>
                  <div>{a.name}</div>
                  <div style={{ color: "tomato" }}>
                    1300 POP{" "}
                    <div className="sell-btn" id={idx}>
                      BUY
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EventMarket;
