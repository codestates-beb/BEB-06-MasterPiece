import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import voteAbi from "../../abi/ercvotingABI";
import { useStore, contractStore } from "../../../store/store";

function Detail({ selectId, communityName, selectedAgenda }) {
  const [detailInfo, setDetailInfo] = useState([]);
  const [description, setDescription] = useState("");

  const { account, proposedId, collectionId } = useStore();
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
  }, []);

  const getDetail = () => {
    axios.get(`http://localhost:3001/community/${selectId}`).then((res) => {
      setDetailInfo(res.data);
      setDescription(res.data[0].description);
    });
  };

  const handleAgree = async () => {
    // solidty에 알려준다.
    //db업데이트해준다./
    await contract.methods
      .isitRight(account, collectionId)
      .call()
      .then((res) => {
        if (res == 1) {
          contract.methods
            .voting(smAddress, account, collectionId, selectId, 1)
            .send(transaction)
            .then((res) => {
              console.log(res);
              axios.post(
                `http://localhost:3001/community/${selectId}/vote`,
                {
                  vote: 1,
                  address: account,
                },
                { headers: { "Content-Type": "application/json" } }
              );
            });
        } else {
          alert("투표 권한이 없습니다.");
        }
      });
  };
  const handleDisagree = async () => {
    console.log(selectId);
    await contract.methods
      .isitRight(account, collectionId)
      .call()
      .then((res) => {
        if (res == 1) {
          contract.methods
            .voting(smAddress, account, collectionId, selectId, 0)
            .send(transaction)
            .then((res) => {
              console.log(res);
              axios.post(
                `http://localhost:3001/community/${selectId}/vote`,
                {
                  vote: 0,
                  address: account,
                },
                { headers: { "Content-Type": "application/json" } }
              );
            });
        } else {
          alert("투표 권한이 없습니다.");
        }
      });
  };
  const checkResult = async () => {
    try {
      await contract.methods
        .result(smAddress, collectionId, selectId)
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
      .getRight(smAddress, collectionId, account)
      .send(transaction)
      .then((res) => {
        console.log(res);
        if (res.status) {
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
              <p style={{ fontSize: "20px", color: "#CDFF00" }}>
                {item.nftname}
              </p>
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
              <button
                className="agenda-detail-btn"
                onClick={handleAgree}
                style={{ backgroundColor: "#a3d18b" }}
              >
                agree
              </button>
            </div>
          </div>
          <div>
            Vote rate
            <button
              className="agenda-detail-btn"
              onClick={checkResult}
              style={{ backgroundColor: "#f7f6d7" }}
            >
              Check result
            </button>
          </div>
          <div>
            Vote Right{" "}
            <button
              className="agenda-detail-btn"
              onClick={getRight}
              style={{ backgroundColor: "#f7f6d7" }}
            >
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
