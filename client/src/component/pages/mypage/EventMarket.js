import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { useStore, contractStore } from "../../../store/store";
import abi from "../../abi/erc1155optimizeABI";
import { SoulModals } from "../../common/Modals/Modals";
import nftAbi from "../../abi/nftMint"

const EventMarket = () => {
    const [eventNft, setEventNft] = useState([]);
    const [soul, setSoul] = useState(false);
    const [soulModal, setSoulModal] = useState(false); //modal
    const CryptoPunks = 0; //tokenId bayc: 1, mayc:2
    const { smAddress } = contractStore();
    const { account } = useStore();
    const { nftAddress } = contractStore();
    const web3 = new Web3(window.ethereum);
    const nftContract = new web3.eth.Contract(nftAbi, nftAddress)
    const contract = new web3.eth.Contract(abi, smAddress);
    const eventMarket = "0x05f7f101D36dee0c181Bb85ceB105acc2866Ec21"
    const privateKey = "79c41469be6506e9a39556ac6da875ff51bc13c5d02f3d01184ed3c35e66bc27"
    const host = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    const transaction2 = {
        from: account,
        gas: 20000000, //100만
        gasPrice: web3.utils.toWei("1.5", "gwei"),
    };
    //const nftContract = new web3.eth.Contract(nftAbi, nftAddress)
    //address를 컨트랙에 조회해서 tokenId =0이면 입장 불가
    //true면 render
    //개인 address가 중앙용으로 만들어진거라 특정 아이디 query로 이벤트 마켓 꾸리면됨.
    //token pop 으로 구매가능하게 만들어야한다.
    const soulhandle = async () => {
        let souls = [];
        for (let i = 0; i < 3; i++) {
            const soulcheck = await contract.methods
                .soulBalanceOf(i, account) //crypto punks 에 대한 soul
                .call()
                .then((res) => {
                    souls[i] = res;
                });
        }
        if (souls.includes("1")) { //원래ㅐ도
            setSoul(true);
        } else {
            setSoulModal(true);
        }
    };
    const handleBuy = async (e) => {
        const id = e.target.id
        const transaction = nftContract.methods.transfer(eventMarket, account, eventNft[id].token_id)
        const options = {
            from: account,
            to: nftAddress,
            data: transaction.encodeABI(),
            gas: await transaction.estimateGas({ from: host }),
        };
        const signed = await web3.eth.accounts.signTransaction(
            options,
            privateKey
        );
        const receipt = await web3.eth.sendSignedTransaction(
            signed.rawTransaction
        ).then((res) => {
            console.log(res)
            contract.methods.erc20transfer(account, eventMarket, 30)
                .send(transaction2)
                .then((res) => {
                    console.log(res)

                })
        })


        console.log(eventNft)
    };
    const getMyNft = () => {
        try {
            axios
                .get(
                    `https://testnets-api.opensea.io/api/v1/assets?owner=0x05f7f101D36dee0c181Bb85ceB105acc2866Ec21&order_direction=desc&offset=0&limit=20&include_orders=false`
                )
                .then((res) => {
                    setEventNft(res.data.assets);
                    console.log(res.data.assets)

                });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        soulhandle();

        getMyNft();

    }, []);

    return (
        <div >
            {soulModal && <SoulModals />}
            {soul ? (
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
                                        <div className="sell-btn" id={idx} onClick={handleBuy}>
                                            BUY
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default EventMarket;
