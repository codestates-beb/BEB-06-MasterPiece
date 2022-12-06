import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import voteAbi from "../../abi/ercvotingABI";
import { useStore, contractStore } from "../../../store/store";

function Detail({ selectId, communityName, selectedAgenda }) {
  const [detailInfo, setDetailInfo] = useState([]);
  const [description, setDescription] = useState("");
  const CryptoPunks = 0;
  const { account, proposedId } = useStore();
  const { daoVotingContract, smAddress } = contractStore();
  const web3 = new Web3(window.ethereum);
  const [right, setRight] = useState("");
  const contract = new web3.eth.Contract(voteAbi, daoVotingContract);
  const transaction = {
    from: account,
    gas: 20000000, //100만
    gasPrice: web3.utils.toWei("1.5", "gwei"),
  };

  useEffect(() => {
    getDetail();
    progressBar();
    console.log(selectId);
    console.log(parseInt(communityName));
  }, []);

  const getDetail = () => {
    axios.get(`http://localhost:3001/community/${selectId}`).then((res) => {
      setDetailInfo(res.data);
      setDescription(res.data[0].description);
    });
  };

  console.log(description);

  function progressBar() {
    let circle = document.getElementById("one");
    let text = document.getElementById("percent-one");
    let angle = 0;
    let percent = 40 * 4.7; //agree 수 여기서 setting

    let timer = setInterval(() => {
      circle.setAttribute("stroke-desharray", angle + ", 20000");
      text.innerHTML = parseInt((angle / 471) * 100);
      if (angle >= percent) {
        clearInterval(timer);
      }
      angle += 6;
    }, 30);

    let circle1 = document.getElementById("two");
    let text1 = document.getElementById("percent-two");
    let angle1 = 0;
    let percent1 = 60 * 4.7; //vote rate 여기서 setting

    let timer1 = setInterval(function () {
      circle1.setAttribute("stroke-dasharray", angle1 + ", 20000");
      text1.innerHTML = parseInt((angle1 / 471) * 100) + "%";
      if (angle1 >= percent1) {
        clearInterval(timer1);
      }
      angle1 += 7;
    }, 30);

    //---

    let circle2 = document.getElementById("three");
    let text2 = document.getElementById("percent-three");
    let angle2 = 0;
    let percent2 = 20 * 4.7; //disagree 수 여기서 setting

    let timer2 = setInterval(function () {
      circle2.setAttribute("stroke-dasharray", angle2 + ", 20000");
      text2.innerHTML = parseInt((angle2 / 471) * 100);
      if (angle2 >= percent2) {
        clearInterval(timer2);
      }
      angle2 += 6;
    }, 30);
  }
  const handleAgree = async () => {
    // solidty에 알려준다.
    //db업데이트해준다./
    await contract.methods
      .isitRight(account, CryptoPunks)
      .call()
      .then((res) => {
        if (res == 1) {
          contract.methods
            .voting(smAddress, account, CryptoPunks, selectId, 1)
            .send(transaction)
            .then((res) => {
              console.log(res);
            });
        } else {
          alert("투표 권한이 없습니다.");
        }
      });
  };
  const handleDisagree = async () => {
    console.log(selectId);
    await contract.methods
      .voting(smAddress, account, CryptoPunks, selectId, 0)
      .send(transaction)
      .then((res) => {
        console.log(res);
      });
  };
  const checkResult = async () => {
    try {
      await contract.methods
        .result(smAddress, CryptoPunks, selectId)
        .call()
        .then((res) => {
          console.log(res);
          if (res == "disagree") {
            alert("투표가 부결되었습니다.");
          } else {
            alert("투표가 승인되었습니다.");
          }
        });
    } catch (err) {
      alert("투표가 진행 중 입니다.");
    }
  };
  const getRight = async () => {
    await contract.methods
      .getRight(smAddress, CryptoPunks, account)
      .send(transaction)
      .then((res) => {
        console.log(res);
        if (res == 1) {
          alert("투표 가능");
        } else {
          alert("");
        }
      });
  };
  return (
    <div>
      {selectedAgenda.map((item) => {
        return (
          <div className="agenda-box" style={{ height: "600px", width: "75%" }}>
            <div className="vertical-line"></div>
            <div className="agenda-img">
              <img src="gallery2.jpg" className="agenda-img" />
            </div>
            <div className="agenda-title">
              <p>{item.collectionName}</p>
              <p style={{ fontSize: "20px", color: "#CDFF00" }}>#1143</p>
              <div className="agenda-single-box">
                <img src="profile.jpg" className="agenda-profile"></img>
                <div className="agenda-single">
                  <div className="agenda-address">
                    {item.address.slice(0, 6)}...{item.address.slice(-3)}
                    <div className="agenda-type">{item.type}</div>
                    <div className="agenda-type-div">#{item.postId}</div>
                  </div>
                  <div className="agenda-single-title1">
                    Title : {item.title}
                  </div>
                  <div className="agenda-single-content">{description}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="agenda-detail-box">
        <div id="lang">
          <div>
            Agree{" "}
            <div>
              <button className="agenda-detail-btn" onClick={handleAgree}>
                agree
              </button>
            </div>
          </div>
          <div>
            Vote rate
            <button className="agenda-detail-btn" onClick={checkResult}>
              Check result
            </button>
          </div>
          <div>
            Vote Right{" "}
            <button className="agenda-detail-btn" onClick={getRight}>
              getRight
            </button>
          </div>
          <div>
            Disagree
            <button className="agenda-detail-btn" onClick={handleDisagree}>
              disagree
            </button>
          </div>
        </div>
        <div className="agenda-detail-btn-box"></div>
      </div>
    </div>
  );
}

export default Detail;
