import React, { useEffect, useState } from 'react';
import Sidebar from '../components/advisor/Sidebar';
import Dashboard from '../components/advisor/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/advisor.module.css';
import AdvisorHeader from '../components/advisor/AdvisorHeader';
import { ADVISORTAG } from '../constants/ADVISORTAG';

const Advisor = () => {

    const [tags, setTags] = useState([])

    //관리자페이지 태그 불러오기
    useEffect(() => {

        const newTags = [];

        for (const key in ADVISORTAG) {

            if (ADVISORTAG.hasOwnProperty(key)) {
              const value = ADVISORTAG[key];
              newTags.push(value);
            }
          }  

          setTags(newTags);

    }, [])

    //선택된 현재 태그
    const [currentTag, setCurrentTag] = useState();

    console.log(currentTag);

    return (
        <div> 
            <AdvisorHeader styles={styles} />
            <div className={styles.container} > 
                <Sidebar className={styles.item} styles={styles} currentTag={currentTag} tags={tags} setCurrentTag={setCurrentTag}  />
                <Dashboard className={styles.item}  styles={styles} currentTag={currentTag} />
            </div>
        </div>
    );
};

export default Advisor;