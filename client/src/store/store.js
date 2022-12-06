//공통으로 쓰는 state
import create from "zustand";

export const useStore = create((set) => ({
  account: 0,
  myProfile: "",
  logout() {
    set((state) => ({ account: 0 }));
  }, //logout 함수쓰면 account 0으로 만들어줌

  //header community 관리용
  openCommunity: false,

  proposedId: 0,
  collectionId: 0,
  typeStatus: "disagree",
}));
export const contractStore = create((set) => ({
  smAddress: "0x4d3Ca82e234f9653ADF7ae3791Ec7a66e60DD362",
  daoVotingContract: "0xC8abC2e3749DAE21461B01390077C00F22D21901",
  nftAddress: "0x3B00Bc19C85cf93C02dEC8df21F3c8FC3D030cE6",
}));
