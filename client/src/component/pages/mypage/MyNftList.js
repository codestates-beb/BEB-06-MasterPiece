import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import Sellnft from "./Sellnft";
import { useStore } from "../../../store/store";

const MyNftList = () => {
    const { account } = useStore();
    const [myNft, setMyNft] = useState([]);
    const [sell, setSell] = useState(false);
    const [selectNft, setSelectNft] = useState(""); //[]번쨰

    const getMyNft = () => {
        try {
            axios
                .get(
                    `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20&include_orders=false`
                )
                .then((res) => {
                    setMyNft(res.data.assets);
                    console.log(myNft);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSell = (e) => {
        // const number = e.target.value
        // axios.post("http://localhost:8080/", {
        //     name: myNft[number].name,
        //      id : myNft[number].token_id
        //     })
        setSell(true);
        setSelectNft(e.target.id);
    };

    useEffect(() => {
        getMyNft();
    }, []);

    return (
        <div>
            {sell ? (
                <Sellnft selectNft={myNft[selectNft]} />
            ) : (
                <div className="fractionalnft-box">
                    {myNft.map((a, idx) => {
                        return (
                            <div className="my-nft">
                                <img className="my-pic" src={a.image_url} />
                                <div className="frac-des">
                                    <div>{a.collection.name}</div>
                                    <div>{a.name}</div>
                                    <div style={{ color: "tomato" }}>
                                        0.013 ETH{" "}
                                        <div className="sell-btn" onClick={handleSell} id={idx}>
                                            sell
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default MyNftList;
