import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummydata } from "../../common/dummy/dummydata";
import Web3 from "web3";
import abi from "../../abi/erc1155optimizeABI";
import Detail from "./Detail";
import { useStore, contractStore } from "../../../store/store";

function Agenda({ communityName }) {
  const navigate = useNavigate();
  const { account } = useStore();
  const { smAddress } = contractStore();
  //dummy data
  const [agenda, setAgenda] = useState(dummydata);
  const selectList = ["all", "sell", "staking", "etc"];
  const [Selected, setSelected] = useState("all");
  const [collectionName, setCollectionName] = useState("");
  const [collectionNum, setCollectionNum] = useState(0);
  const [collectionPic, SetCollectionPic] = useState("");
  const [selectId, setSelectId] = useState(0); // 선택된 single agenda id
  const CryptoPunks = 0; //tokenId bayc: 1, mayc:2

  useEffect(() => {
    handleSetName(communityName);
  }, []);

  const handleSetName = (communityName) => {
    let filterAgenda = dummydata.filter((a) => {
      return a.pieceId == communityName;
    });
    if (communityName == "1") {
      setCollectionName("Bored Ape Yacht Club");
      setCollectionNum(3152);
      SetCollectionPic(
        "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1920"
      ); //일단 하드코딩
      setAgenda(filterAgenda);
    }
    if (communityName == "0") {
      setCollectionName("Crypto Punks");
      setCollectionNum(1082);
      SetCollectionPic(
        "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=1920"
      );
      setAgenda(filterAgenda);
    }
    if (communityName == "2") {
      setCollectionName("Mutant Ape Yacht Club");
      setCollectionNum(5082);
      SetCollectionPic(
        "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&w=1920"
      );
      setAgenda(filterAgenda);
    }
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClickWrite = async () => {
    if (account === 0) {
      alert("Please connect wallet");
    } else {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, smAddress);
      const soulcheck = await contract.methods
        .soulBalanceOf(CryptoPunks, account)
        .call();
      if (soulcheck == 0) {
        alert("No soul found");
      } else {
        navigate("/write");
      }
    }
  };

  const handleClickAgenda = (e) => {
    setSelectId(e.currentTarget.id);
  };

  const handleClickFractional = () => {
    navigate("/fractionalnft");
  };
  return (
    <div>
      {selectId ? (
        <Detail selectId={selectId} communityName={communityName} />
      ) : (
        <div className="agenda-box">
          <div className="vertical-line"></div>
          <div className="agenda-img">
            <img src={collectionPic} className="agenda-img" />
          </div>
          <div className="agenda-title">
            <p onClick={handleClickFractional}>{collectionName}</p>
            <p style={{ fontSize: "20px", color: "#CDFF00" }}>
              #{collectionNum}
            </p>
            {Selected == "all" ? (
              <div>
                {agenda.map((a) => (
                  <div className="agenda-single-box">
                    <img src={a.profile} className="agenda-profile"></img>
                    <div
                      className="agenda-single"
                      onClick={handleClickAgenda}
                      id={a.id}
                    >
                      <div className="agenda-address">
                        {a.address} <div className="agenda-type">{a.type}</div>
                        <div className="agenda-type-div"># 안건번호</div>
                      </div>
                      <div className="agenda-single-title">{a.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {agenda
                  .filter((a) => {
                    return Selected === a.type;
                  })
                  .map((a) => {
                    return (
                      <div className="agenda-single-box">
                        <img src={a.profile} className="agenda-profile"></img>
                        <div
                          className="agenda-single"
                          onClick={handleClickAgenda}
                          id={a.id}
                        >
                          <div className="agenda-address">
                            {a.address}{" "}
                            <div className="agenda-type">{a.type}</div>
                          </div>
                          <div className="agenda-single-title">{a.title}</div>
                        </div>
                      </div>
                    );
                  })}{" "}
              </div>
            )}
          </div>

          {/*///////// select box ///////// */}
          <div className="agenda-filter">
            <label>Filter: </label>
            <select onChange={handleChangeSelect} value={Selected}>
              {selectList.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="agenda-token-btn">Claim</div>
          <div className="agenda-write-btn" onClick={handleClickWrite}>
            write
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;
