import React from 'react';

const Sidebar = ({tags, currentTag, setCurrentTag, styles}) => {

  const changeTag = (e) => {

    setCurrentTag(e.target.value);
  }

  
  const getToken = () => {
    window.open('https://kauth.kakao.com/oauth/authorize?client_id=8cad95a2af1412995b72052da8e5094b&response_type=code&redirect_uri=http://www.togother.kro.kr/token', 
    'pop01', 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no');
  }

  return (
    <div className={styles.sidebar}>
       {
        tags.map(item => (
          <button className={`${styles.tagBtn} ${currentTag === item ? styles.active : ''}`} key={item} value={item || ''} onClick={changeTag}>{item}</button>
        ))
       }
       <button onClick={() => getToken()} 
          style={{borderRadius:'20px',backgroundColor:'#2E8DFF',border:0,color:'white',padding:'15px',fontSize:'13px',margin:'10px'}}>
          주문 토큰 갱신
        </button>
    </div>
  );
};

export default Sidebar;
