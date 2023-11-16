// CityMainPageStyles.js

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  @media (max-width: 1200px) {
    flex-direction: column;
    transition: margin-left 0.5s ease;
    margin-left: ${({ isSidebarExpanded }) => (isSidebarExpanded ? '0' : '-15em')};
  }
`;

export const SidebarContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 3em;
  height: 3em;
  background-color: #000;
  color: #fff;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2; /* SidebarContainer가 위에 나타나도록 z-index 추가 */

  @media (min-width: 1200px) {
    display: none;
  }
`;

export const Sidebar = styled.div`
  @media (max-width: 1200px) {
    /* Sidebar의 스타일을 정의하세요 */
    display: ${({ isSidebarExpanded }) => (isSidebarExpanded ? 'flex' : 'none')};
    width: 15em; /* Adjust the width based on your design */
    background-color: #000; /* Add your desired background color */
    color: #fff; /* Add your desired text color */
    /* Add other styling as needed */
    z-index: 1; /* Sidebar가 메인 컨텐츠 위에 나타나도록 z-index 추가 */
  }
`;

export const MainContent = styled.div`
  @media (max-width: 1200px) {
    /* 메인 컨텐츠의 스타일을 정의하세요 */
    flex: 1;
    overflow: hidden;
    margin-left: ${({ isSidebarExpanded }) => (isSidebarExpanded ? '15em' : '0')};
    z-index: 0; /* MainContent가 Sidebar 아래에 나타나도록 z-index 추가 */
  }
`;

export const Overlay = styled.div`
  @media (max-width: 1200px) {
    display: ${({ isSidebarExpanded }) => (isSidebarExpanded ? 'block' : 'none')};
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${({ isSidebarExpanded }) => (isSidebarExpanded ? '0.5' : '0')});
    z-index: 1;
    top: 0;
    left: 0;
    transition: background-color 0.5s;
  }
`;
