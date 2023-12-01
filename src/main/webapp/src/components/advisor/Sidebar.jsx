import React from 'react';

const Sidebar = ({tags, currentTag, setCurrentTag, styles}) => {

  const changeTag = (e) => {

    setCurrentTag(e.target.value);
  }

  
  const getToken = () => {
    window.open('https://kauth.kakao.com/oauth/authorize?client_id=8cad95a2af1412995b72052da8e5094b&response_type=code&redirect_uri=http://localhost:3000/token', 
    'pop01', 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no');
  }

  return (
    <div className={styles.sidebar}>
       {
        tags.map(item => (
          <button className={`${styles.tagBtn} ${currentTag === item ? styles.active : ''}`} key={item} value={item || ''} onClick={changeTag}>{item}</button>
        ))
       }
       <button onClick={() => getToken()}>토큰 갱신용</button>
    </div>
  );
};

export default Sidebar;
