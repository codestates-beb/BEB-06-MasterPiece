import { useState, useEffect } from "react";
import axios from "axios";
const EventMarket = () => {
    const [eventNft, setEventNft] = useState([]);

    //address를 컨트랙에 조회해서 tokenId =0이면 입장 불가
    //true면 render
    //개인 address가 중앙용으로 만들어진거라 특정 아이디 query로 이벤트 마켓 꾸리면됨.
    //token pop 으로 구매가능하게 만들어야한다.
    const getMyNft = () => {
        try {
            axios
                .get(
                    `https://testnets-api.opensea.io/api/v1/assets?owner=0xc1eb3DCCB66050981c2aF930B142d778eE187a88&order_direction=desc&offset=0&limit=20&include_orders=false`
                )
                .then((res) => {
                    setEventNft(res.data.assets);
                    console.log(eventNft);
                });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getMyNft();
    }, []);

    return (
        <div className="fractionalnft-box">
            {eventNft.map((a, idx) => {
                return (
                    <div className="event-nft">
                        <img className="event-pic" src={a.image_url} />
                        <div className="frac-des">
                            <div>{a.collection.name}</div>
                            <div>{a.name}</div>
                            <div style={{ color: "tomato" }}>
                                1300 POP{" "}
                                <div className="sell-btn" id={idx}>
                                    BUY
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default EventMarket;
