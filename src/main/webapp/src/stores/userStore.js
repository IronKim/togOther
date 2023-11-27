import { getUserByAccessToken, getTokenByRefreshToken } from '../api/UserApiService';
import { create } from 'zustand';
import defaultImg from '../assets/image/profile_thumb.png';

const initialUser = {
    userSeq: '',
    email: '',
    id: '',
    pwd: '',
    name: '',
    birthday: '',
    phone: '',
    gender: '',
    national: '',
    profileImage: {defaultImg},
    profileText: '',
    likingFood: '',
    likingTrip: '',
    mbti: '',
    coin: '',
    dupLogin: '',
    cityList: '',
    likingPlace: '',
    certification: '',
    authority: ''
  };

const useStore = create((set) => ({
  user: initialUser,
  loading: true, // 추가: 초기 로딩 상태
  setLoading: (loading) => set({ loading }), // 추가: 로딩 상태 업데이트 함수
  setUser: (user) => set({ user, loading: false }), // 사용자 정보를 가져오면 로딩 상태를 false로 설정
  getUserByToken: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      set({ loading: false }); // 토큰이 없으면 로딩 상태를 false로 설정
      return;
    }

    try {
      const response = await getUserByAccessToken(accessToken);
      set({ user: response.data.user, loading: false }); // 사용자 정보를 가져오면 로딩 상태를 false로 설정
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        console.log('accessToken 토큰 만료');
        await refreshToken();
      }
    }
  },
  clearUser: () => set({ user: initialUser, loading: true }),
}));

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    useStore.getState().setLoading(false); // 리프레시 토큰이 없으면 로딩 상태를 false로 설정
    return;
  }

  try {
    const response = await getTokenByRefreshToken(refreshToken);
    localStorage.setItem('accessToken', response.headers.authorization);
    localStorage.setItem('refreshToken', response.headers['refresh-token']);
    useStore.getState().getUserByToken();
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      console.log('refreshToken 토큰 만료');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    }
  }
};

export default useStore;

  
  // useUserStore.js
// import { getUserByAccessToken, getTokenByRefreshToken } from '../api/UserApiService';
// import create from 'zustand';

// const useUserStore = create((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   getUserByToken: async () => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       return;
//     }

//     try {
//       const response = await getUserByAccessToken(accessToken);
//       set({ user: response.data.user });
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.status === 401) {
//         console.log('accessToken 토큰 만료');
//         await refreshToken();
//       }
//     }
//   },
// }));

// export const refreshToken = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');

//   if (!refreshToken) {
//     return;
//   }

//   try {
//     const response = await getTokenByRefreshToken(refreshToken);
//     localStorage.setItem('accessToken', response.headers.authorization);
//     localStorage.setItem('refreshToken', response.headers['refresh-token']);
//     useUserStore.getState().getUserByToken();
//   } catch (error) {
//     console.error(error);
//     if (error.response && error.response.status === 401) {
//       console.log('refreshToken 토큰 만료');
//       localStorage.removeItem('refreshToken');
//     }
//   }
// };

// export default useUserStore;
