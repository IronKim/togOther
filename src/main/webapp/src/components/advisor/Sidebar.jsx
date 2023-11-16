import React from 'react';

const Sidebar = ({tags, currentTag, setCurrentTag, styles}) => {

  const changeTag = (e) => {

    setCurrentTag(e.target.value);
  }

  return (
    <div className={styles.sidebar}>
       {
        tags.map(item => (
          <button className={`${styles.tagBtn} ${currentTag === item ? styles.active : ''}`} key={item} value={item || ''} onClick={changeTag}>{item}</button>
        ))
       }
    </div>
  );
};

export default Sidebar;
