// AdvisorRoute.js 또는 UserRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from '../stores/mainStore'; // 실제 경로에 맞게 수정
import LoadingComponent from './LoadingComponent';

const AdvisorRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading, getUserByToken } = useUserStore();


  // 로딩 중이면 로딩 화면을 렌더링
  if (loading) {
    return <LoadingComponent />;
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
