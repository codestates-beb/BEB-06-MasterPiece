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



}));
export const contractStore = create((set) => ({
  smAddress: "0xbFaF3a9ce3710403A0c3D4310753c9C07b45c22E",
  daoVotingContract: "0x4c89c29085a5719350A44037Db79e22d45284b2a"
}))



