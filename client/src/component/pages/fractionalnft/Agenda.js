import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummydata } from "../../common/dummy/dummydata";
import Detail from "./Detail";
import useStore from "../../../store/store";

function Agenda({ communityName }) {
  const navigate = useNavigate();
  const { agendaSelectedId } = useStore();
  //dummy data
  const [agenda, setAgenda] = useState(dummydata);
  const selectList = ["sell", "staking"];
  const [Selected, setSelected] = useState("sell");
  const [collectionName, setCollectionName] = useState("");
  const [collectionNum, setCollectionNum] = useState(0);
  const [collectionPic, SetCollectionPic] = useState("");
  const [selectId, setSelectId] = useState(0); // 선택된 single agenda id

  useEffect(() => {
    handleSetName(communityName);
  }, []);

  const handleSetName = (communityName) => {
    let filterAgenda = dummydata.filter((a) => {
      return a.collectionname == communityName;
    });
    if (communityName == "Bored Ape Yacht Club") {
      setCollectionName("Bored Ape Yacht Club");
      setCollectionNum(15923);
      SetCollectionPic("gallery2.jpg"); //일단 하드코딩
      setAgenda(filterAgenda);
    }
    if (communityName == "Crypto Punks") {
      setCollectionName("Crypto Punks");
      setCollectionNum(587);
      SetCollectionPic("gallery1.jpg");
      setAgenda(filterAgenda);
    }
    if (communityName == "Mustant Ape Yacht Club") {
      setCollectionName("Mutant Ape Yacht Club");
      setCollectionNum(2944);
      SetCollectionPic("gallery3.jpg");
      setAgenda(filterAgenda);
    }
  };

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClickWrite = () => {
    navigate("/write");
  };

  const handleClickAgenda = (e) => {
    setSelectId(e.currentTarget.id);
  };
  console.log(agendaSelectedId);

  const handleClickFractional = () => {
    navigate("/fractionalnft");
  };
  return (
    <div>
      {selectId ? (
        <Detail selectId={selectId} />
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
                        {a.address} <div className="agenda-type">{a.type}</div>
                      </div>
                      <div className="agenda-single-title">{a.title}</div>
                    </div>
                  </div>
                );
              })}
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
          <div className="agenda-write-btn" onClick={handleClickWrite}>
            write
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;
