import { useState } from "react";

function Agenda() {
  const [agenda, setAgenda] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="agenda-box">
      <div className="vertical-line"></div>
      <div className="agenda-img">
        <img src="gallery2.jpg" className="agenda-img" />
      </div>
      <div className="agenda-title">
        Bored Ape Yacht Club{" "}
        <p style={{ fontSize: "20px", color: "#CDFF00" }}>#15923</p>
        {agenda.map((a) => {
          return (
            <div className="agenda-single-box">
              <img src="profile.jpg" className="agenda-profile"></img>
              <div className="agenda-single">
                <div className="agenda-address">0x132...256</div>
                <div className="agenda-single-title">
                  I need a money ... wanna sell...
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="agenda-write-btn">write</div>
    </div>
  );
}

export default Agenda;
