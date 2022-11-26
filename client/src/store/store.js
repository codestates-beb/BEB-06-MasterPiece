//공통으로 쓰는 state
import create from "zustand";

const useStore = create((set) => ({
  account: 0,
  logout() {
    set((state) => ({ account: 0 }));
  }, //logout 함수쓰면 account 0으로 만들어줌

  //header community 관리용
  openCommunity: false,
}));

export default useStore;
