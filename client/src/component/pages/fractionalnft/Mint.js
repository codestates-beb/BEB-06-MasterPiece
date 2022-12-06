import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Web3 from "web3";
import { WalletModals } from "../../common/Modals/Modals";
import { useStore, contractStore } from "../../../store/store";
import abi from "../../abi/erc1155optimizeABI";

function Mint() {
  const { smAddress } = contractStore();
  const { account, collectionId } = useStore();
  const [walletModal, setWalletModal] = useState(false); //madal
  const [collectionName, setCollectionName] = useState("");
  const [nftName, setNftName] = useState("");
  const [total, setTotal] = useState(0);
  const [owner, setOwner] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [start, setStart] = useState(false); //처음에는 비활성화
  const cryptoPunksProfile =
    "https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000";
  const CryptoPunks = 0; //tokenId bayc: 1, mayc:2

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("Dec 04, 2022 00:00:00").getTime(); //민팅 시작 시간

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
        setStart(true);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/mint", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setTotal(res.data[0].pieceTotalCount);
        setOwner(res.data[0].uniqueOwner);
        setDescription(res.data[0].description);
        setPrice(res.data[0].price);
        setCollectionName(res.data[0].collectionName);
        setNftName(res.data[0].name);
      });
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const minting = async () => {
    const web3 = new Web3(window.ethereum);
    if (account === 0) {
      setWalletModal(true);
    } else {
      const contract = new web3.eth.Contract(abi, smAddress);
      const soulcheck = await contract.methods
        .soulBalanceOf(collectionId, account)
        .call();
      //soul 이 없어야 transaction 실행 =>
      if (soulcheck == 0) {
        let params = [
          {
            from: account,
            to: "0xEcd5c913FC8B656dbfe0f2d902E1b0902de025aA",
            gas: Number(21000).toString(16),
            gasPrice: Number(2500000).toString(16),
            value: Number(1000000000000000).toString(16),
          },
        ];
        await window.ethereum
          .request({
            method: "eth_sendTransaction",
            params,
          })
          .then(async (result) => {
            const privateKey =
              "299a2a3f9ce26ada82bb0a548c3f88a638125e010be4c9a458485eb485487e98";

            const host =
              web3.eth.accounts.privateKeyToAccount(privateKey).address;

            const transaction = contract.methods.souldrop(
              collectionId,
              account,
              ""
            );
            const options = {
              from: account,
              to: smAddress,
              data: transaction.encodeABI(),
              gas: await transaction.estimateGas({ from: host }),
            };
            const signed = await web3.eth.accounts.signTransaction(
              options,
              privateKey
            );
            const receipt = await web3.eth.sendSignedTransaction(
              signed.rawTransaction
            );
            return receipt;
          })
          .then((receipt) => {
            if (receipt.status) {
              axios
                .post(
                  `http://localhost:3001/mint`,
                  {
                    pieceMintingId: 1,
                    address: account,
                    profile: cryptoPunksProfile,
                  },
                  { Headers: { "Content-Type": "application/json" } }
                )
                .then((res) => {
                  console.log(res);
                  alert("success");
                });
            }
          })
          .catch((error) => {
            console.log(error);
            alert("mint 실패");
          });
      } else {
        alert("already minted");
      }
    }
  };

  const handleStartAlert = () => {
    alert("Minting start on Dec 07");
  };

  return (
    <div>
      {walletModal && <WalletModals />}
      <div className="mint-box">
        <section>
          <h1 className="mint-title">
            <div>
              <img src="Puzzle.jpg" />
            </div>{" "}
            &nbsp; {collectionName} {nftName}
          </h1>
          <div className="verify-badge">
            <div className="badge">1 piece</div>
            <div className="badge" style={{ border: "2px solid #CDFF00" }}>
              VERIFIED <div className="ranking-chk"></div>
            </div>
          </div>

          <img
            src="https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000"
            className="mint-img"
          ></img>
          <div className="mint-one">1 / 1</div>
        </section>
      </div>
      <div className="mint-des-box">
        <div className="mint-grid-1">
          <span>Description</span>
          <p> {description}</p>
          <div className="mint-col-sup">
            <span>Price</span> <p>{price} ETH</p>
          </div>
          <div className="mint-uniq">
            <span>UNIQUE OWNERS</span>{" "}
            <p>
              {owner} / {total}
            </p>
          </div>
        </div>
        <div className="mint-grid-2">
          <span style={{ marginLeft: "50px" }}>Start time Dec 07</span>
          <div className="mint-input-div">
            <div className="timer-box">
              <section className="timer-container">
                <section className="timer">
                  <div>
                    <section>
                      <p>{timerDays}</p>
                      <p>
                        <small>Days</small>
                      </p>
                    </section>
                    <span>:</span>
                    <section>
                      <p>{timerHours}</p>
                      <p>
                        <small>Hours</small>
                      </p>
                    </section>
                    <span>:</span>
                    <section>
                      <p>{timerMinutes}</p>
                      <p>
                        <small>Minutes</small>
                      </p>
                    </section>
                    <span>:</span>
                    <section>
                      <p>{timerSeconds}</p>
                      <p>
                        <small>Seconds</small>
                      </p>
                    </section>
                  </div>
                </section>
              </section>
            </div>
            {start ? (
              <div>
                <button className="minting-btn" onClick={minting}>
                  1 Mint per 1 address
                </button>
              </div>
            ) : (
              <div>
                <div>
                  <button
                    className="minting-btn-stop"
                    onClick={handleStartAlert}
                  >
                    1 Mint per 1 address
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mint;
