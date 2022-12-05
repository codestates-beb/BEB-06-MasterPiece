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
  smAddress: "0x721cB9fe2C227EF9Cf06DA970d93CBD69aB12C60",
  daoVotingContract: "0x076af9894eE4F31E52Cd8DCc09d2079F489c6a8F",
}));
