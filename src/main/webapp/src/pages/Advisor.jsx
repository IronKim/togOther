import React, { useState } from 'react';
import Sidebar from '../components/advisor/Sidebar';
import Dashboard from '../components/advisor/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/advisor.module.css';
import AdvisorHeader from '../components/advisor/AdvisorHeader';

const Advisor = () => {

    const tags = [
        'CITY',
        'USER'
    ]

    const [currentTag, setCurrentTag] = useState(tags[0]);

    return (
        <div> 
            <AdvisorHeader />
            <div className={styles.container} > 
                <Sidebar className={styles.item} tags={tags} setCurrentTag={setCurrentTag}  />
                <Dashboard className={styles.item} currentTag={currentTag} />
            </div>
        </div>
    );
};

export default Advisor;