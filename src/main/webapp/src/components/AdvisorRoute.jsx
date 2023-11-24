// AdvisorRoute.js 또는 UserRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from '../stores/mainStore'; // 실제 경로에 맞게 수정

const AdvisorRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading, getUserByToken } = useUserStore();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 또는 user 정보가 변경될 때마다 호출
    getUserByToken();
  }, [getUserByToken]);

  // 로딩 중이면 로딩 화면을 렌더링
  if (loading) {
    return <div>Loading...</div>;
  }

  // user 정보가 없으면 리다이렉트
  if (!user) {
    navigate('/');
    return null;
  }

  // user 정보가 있을 때 라우트 렌더링
  if (user.authority === 'ROLE_ADMIN') {
    return children;
  }

  // 그 외의 경우는 리다이렉트
  navigate('/');
  return null;
};

export default AdvisorRoute;
