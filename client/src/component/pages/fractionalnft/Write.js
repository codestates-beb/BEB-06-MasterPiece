import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, contractStore } from "../../../store/store";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import Web3 from "web3";
import votingAbi from "../../abi/ercvotingABI";

function Write() {
  const navigate = useNavigate();
  const selectList = ["sell", "staking", "etc"]; //agenda type
  const stakingPeriod = [5, 10]; //staking period
  const [type, setType] = useState("");
  const [period, setPeriod] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { account } = useStore();
  const { daoVotingContract, smAddress } = contractStore();
  const CryptoPunks = 0; //tokenId bayc: 1, mayc:2

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleChangePeriod = (e) => {
    if (e.target.value === "5") {
      setPeriod(5);
    } else if (e.target.value === "10") {
      setPeriod(10);
    }
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    let metaDataUrl = "";
    let duration = period * 60;
    const projectId = "2GwlTAQdyyInesaPvwtta8CDq7z";
    const projectSecret = "bc12b7f49f073069463cb461e210777c";
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64"); //basic 띄어쓰기 꼭 넣기

    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    const metaData = {
      address: account,
      collectionName: CryptoPunks,
      title: title,
      description: description,
      agendaType: type,
      duration: duration, //staking 시간 sell = 0
    };

    const metaIpfs = await client.add(JSON.stringify(metaData)); //메타데이터 ipfs CID
    metaDataUrl = "https://steemeight.infura-ipfs.io/ipfs/" + metaIpfs.path; //cid
    console.log(metaDataUrl);

    //작성 contract에 보내기. address, agenda type, period, metadata uri (ipfs)
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(votingAbi, daoVotingContract);
    const transaction = {
      from: account,
      gas: 20000000, //100만
      gasPrice: web3.utils.toWei("1.5", "gwei"),
    };
    await contract.methods
      .suggestion(smAddress, CryptoPunks, account, metaDataUrl, duration)
      .send(transaction)
      .then((res) => {
        alert("success");
        navigate("/write");
      });
  };

  return (
    <div className="agenda-box">
      <div className="vertical-line"></div>
      <div className="agenda-img">
        <img src="gallery2.jpg" className="agenda-img" />
      </div>
      <div className="agenda-title">
        <p>Bored Ape Yacht Club</p>
        <p style={{ fontSize: "20px", color: "#CDFF00" }}>#15923</p>
        <div className="write-box">
          <div className="agenda-profile-box">
            <img src="profile.jpg" className="agenda-profile"></img>
            <div className="agenda-single">
              <div className="agenda-address">
                {account.slice(0, 5)}...{account.slice(-3)}
              </div>
              <div>
                {" "}
                <label
                  for="type"
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                >
                  Agenda type :
                </label>
                <select
                  onChange={handleChangeType}
                  value={type}
                  style={{ marginTop: "17px" }}
                  id="type"
                  key={type}
                >
                  {selectList.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>{" "}
                {type === "staking" && (
                  <select
                    onChange={handleChangePeriod}
                    value={period}
                    id="period"
                    name="period"
                  >
                    <option value="" selected>
                      period
                    </option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                  </select>
                )}
              </div>
            </div>
          </div>
          <input
            placeholder="Title..."
            className="agenda-input1"
            onChange={handleChangeTitle}
          ></input>
          <textarea
            placeholder="Description..."
            type="text"
            className="agenda-input2"
            onChange={handleChangeDes}
          ></textarea>
          <button className="write-btn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
