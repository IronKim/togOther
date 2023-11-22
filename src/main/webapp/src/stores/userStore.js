import { create } from "zustand";

const useStore = create((set) => ({
    user: {
        userSeq: '',
        email: '',
        id: '',
        pwd: '',
        name: '',
        birthday: '',
        phone: '',
        gender: '',
        national: '',
        profileImage: '',
        profileText: '',
        likingFood: '',
        likingTrip: '',
        mbti: '',
        coin: '',
        dupLogin: '',
        cityList: '',
        cityFix: '',
        certification: '',
        authority: ''
    },
    setUser: (user) => set({ user: user }),
  }));
  
  export default useStore;