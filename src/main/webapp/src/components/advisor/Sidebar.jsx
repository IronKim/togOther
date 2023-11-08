import React from 'react';

import { Container, Navbar } from 'react-bootstrap';
import styles from '../../css/advisor.module.css';

const Sidebar = ({tags, setCurrentTag}) => {

  console.log(tags)

  const changeTag = (e) => {

    setCurrentTag(e.target.value);
  }




  return (
    <div className={styles.sidebar}>
       {
        tags.map(item => (
          <button key={item} value={item || ''} onClick={changeTag}>{item}</button>
        ))
       }
    </div>
  );
};

export default Sidebar;
