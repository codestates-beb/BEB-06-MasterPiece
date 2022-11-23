import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummydata } from "../../common/dummy/dummydata";

function Agenda() {
  const navigate = useNavigate();
  //dummy data
  const [agenda, setAgenda] = useState(dummydata);
  const selectList = ["sell", "staking"];
  const [Selected, setSelected] = useState("sell");
  console.log(Selected);

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClickWrite = () => {
    navigate("/write");
  };

  const handleClickAgenda = () => {
    navigate("/detail");
  };

  const handleClickFractional = () => {
    navigate("/fractionalnft");
  };
  return (
    <div className="agenda-box">
      <div className="vertical-line"></div>
      <div className="agenda-img">
        <img src="gallery2.jpg" className="agenda-img" />
      </div>
      <div className="agenda-title">
        <p onClick={handleClickFractional}>Bored Ape Yacht Club</p>
        <p style={{ fontSize: "20px", color: "#CDFF00" }}>#15923</p>
        {agenda
          .filter((a) => {
            return Selected === a.type;
          })
          .map((a) => {
            return (
              <div className="agenda-single-box">
                <img src={a.profile} className="agenda-profile"></img>
                <div className="agenda-single" onClick={handleClickAgenda}>
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
  );
}

export default Agenda;
