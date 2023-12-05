import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { naverLoginUser } from '../api/UserApiService';
import Swal from 'sweetalert2'; // SweetAlert2 추가
import { useUserStore } from '../stores/mainStore';

const NaverCallback = () => {
    const { setUser } = useUserStore();

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const code = queryParams.get('code');
  const state = queryParams.get('state');

  useEffect(() => {
    naverLoginUser(code, state)
  .then((res) => {
    console.log(res);
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        showConfirmButton: false,
        timer: 1000
      });

      const { accessToken, refreshToken, user } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);

      if (user.authority === 'ROLE_ADMIN') {
        navigate('/advisor');
      } else {
        navigate('/');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 일치하지 않습니다.'
      });
    }
  })
  .catch((e) => {
    console.log(e);
    Swal.fire({
      icon: 'error',
      title: '로그인 실패',
      text: '이메일이나 비밀번호가 일치하지 않습니다.'
    });
  })
  .finally(() => {
    navigate('/');
  });
  }, []);

    return (
        <div>
            
        </div>
    );
};

export default NaverCallback;