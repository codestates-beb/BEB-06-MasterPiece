import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dummydata } from "../../common/dummy/dummydata";
import Web3 from "web3";
import abi from "../../abi/erc1155optimizeABI";
import Detail from "./Detail";
import { useStore, contractStore } from "../../../store/store";

function Agenda({ communityName, filteredAgenda }) {
  const navigate = useNavigate();
  const { account, collectionId } = useStore();
  const { smAddress } = contractStore();
  const [page, setPage] = useState(1); //pagenation 페이지
  const limit = 5; //filteredAgenda 가일 최대한의 갯수
  const offset = (page - 1) * limit; //시작점과 끝점을 구하는 offset
  const selectList = ["all", "sell", "staking", "etc"];
  const [Selected, setSelected] = useState("all");
  const [collectionName, setCollectionName] = useState("");
  const [collectionNum, setCollectionNum] = useState(0);
  const [collectionPic, SetCollectionPic] = useState("");
  const [selectId, setSelectId] = useState(0); // 선택된 postId
  const selectedAgenda = filteredAgenda.filter((a) => {
    return a.postId == selectId;
  });
  let result = filteredAgenda.slice(offset, offset + limit); //pagenation filter

  const CryptoPunks = 0; //tokenId bayc: 1, mayc:2

  useEffect(() => {
    handleSetName(communityName);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [Selected]);

  const handleSetName = (communityName) => {
    if (communityName == "1") {
      setCollectionName("Bored Ape Yacht Club");
      setCollectionNum(3152);
      SetCollectionPic(
        "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1920"
      ); //일단 하드코딩

      useStore.setState({ collectionId: 1 });
    }
    if (communityName == "0") {
      setCollectionName("Crypto Punks");
      setCollectionNum(1082);
      SetCollectionPic(
        "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=1920"
      );
      useStore.setState({ collectionId: 0 });
    }
    if (communityName == "2") {
      setCollectionName("Mutant Ape Yacht Club");
      setCollectionNum(5082);
      SetCollectionPic(
        "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&w=1920"
      );
      useStore.setState({ collectionId: 2 });
    }
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClickWrite = async () => {
    if (account === 0) {
      alert("Please connect wallet");
    } else {
      console.log(collectionId)
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, smAddress);
      const soulcheck = await contract.methods
        .soulBalanceOf(collectionId, account)
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
    console.log(e.currentTarget.id);
  };

  const handleClickFractional = () => {
    navigate("/fractionalnft");
  };

  const handleClaim = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, smAddress);
    const transaction = {
      from: account,
      gas: 20000000, //100만
      gasPrice: web3.utils.toWei("1.5", "gwei"),
    }; try {
      await contract.methods.getStakingmoney(collectionId, smAddress).send(transaction).then((res) => console.log(res))
    } catch (err) {
      alert("보상 수령이 가능한 상태가 아닙니다.")
    }
  }
  const pageNation = (e) => {
    setPage(e.target.id);
    console.log(e.target.id);
  };
  return (
    <div>
      {selectId ? (
        <Detail
          selectId={selectId}
          communityName={communityName}
          selectedAgenda={selectedAgenda}
        />
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
                {result.map((a) => (
                  <div className="agenda-single-box">
                    <img src="profile.jpg" className="agenda-profile"></img>
                    <div
                      className="agenda-single"
                      onClick={handleClickAgenda}
                      id={a.postId}
                    >
                      <div className="agenda-address">
                        {a.address.slice(0, 6)}...{a.address.slice(-3)}{" "}
                        <div className="agenda-type">{a.type}</div>
                        <div className="agenda-type-div">#{a.postId}</div>
                      </div>
                      <div className="agenda-single-title">{a.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {result
                  .filter((a) => {
                    return a.type === Selected;
                  })
                  .map((a) => {
                    return (
                      <div className="agenda-single-box">
                        <img src="profile.jpg" className="agenda-profile"></img>
                        <div
                          className="agenda-single"
                          onClick={handleClickAgenda}
                          id={a.postId}
                        >
                          <div className="agenda-address">
                            {a.address.slice(0, 6)}...{a.address.slice(-3)}
                            <div className="agenda-type">{a.type}</div>
                          </div>
                          <div className="agenda-single-title">{a.title}</div>
                        </div>
                      </div>
                    );
                  })}{" "}
              </div>
            )}
            <div className="page-box">
              {[1, 2, 3, 4, 5].map((a) => {
                return (
                  <div onClick={pageNation} id={a} className="page">
                    {a}
                  </div>
                );
              })}
            </div>
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
          <div className="agenda-token-btn" onClick={handleClaim}>Claim</div>
          <div className="agenda-write-btn" onClick={handleClickWrite}>
            write
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;
