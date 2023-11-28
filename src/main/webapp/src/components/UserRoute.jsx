import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from '../stores/mainStore'; 
import LoadingComponent from './LoadingComponent';

const UserRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading, getUserByToken } = useUserStore();

  // 로딩 중이면 로딩 화면을 렌더링
  if (loading) {
    return <LoadingComponent />;
  }

  // user 정보가 없으면 리다이렉트
  if (user.name === '') {
    navigate('/');
    return null;
  }

  // user 정보가 있을 때 라우트 렌더링
  return children;
};

export default UserRoute;
