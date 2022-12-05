//공통으로 쓰는 state
import create from "zustand";

export const useStore = create((set) => ({
  account: 0,
  logout() {
    set((state) => ({ account: 0 }));
  }, //logout 함수쓰면 account 0으로 만들어줌

  //header community 관리용
  openCommunity: false,

  proposedId: 0,
  collectionId: 0,
}));
export const contractStore = create((set) => ({
  smAddress: "0x75E33587d1284be2D7E2e55Cf5518BE4a377770E",
  daoVotingContract: "0x616D77F351b1816c9A00C4Cd1fA094D7efF48d86",
}));
