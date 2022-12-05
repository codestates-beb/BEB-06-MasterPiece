import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

export function SoulModals() {
  const [modal, setModal] = useState(true);
  const navigate = useNavigate();
  const toggleModal = () => {
    setModal(!modal);
    navigate("/mint");
  };

  return (
    <div>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>No soul found</h2>
            <p>You can get after Minting SBT</p>
            <div className="close-modal" onClick={toggleModal}>
              close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function WalletModals() {
  const [modal1, setModal1] = useState(true);
  const navigate = useNavigate();
  const toggleModal = () => {
    setModal1(!modal1);
    navigate("/");
  };

  const toggleConnect = () => {
    navigate("/connectwallet");
  };

  return (
    <div>
      {modal1 && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Please connect wallet</h2>
            <button
              style={{ marginLeft: "19%", height: "44px", width: "200px" }}
              onClick={toggleConnect}
            >
              connect wallet
            </button>
            <div className="close-modal" onClick={toggleModal}>
              close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
