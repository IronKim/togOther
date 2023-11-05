import React, { useEffect, useState } from 'react';

import {advisorTag} from '../../constants/advisorTag';
import styles from '../../css/advisor.module.css';
import AdvisorDashboardCity from './AdvisorDashboardCity';
import { getCity } from '../../api/AdvisorApiService';

const Dashboard = ({currentTag}) => {
  
  return (
    <div className={styles.dashboard}>
      {
        currentTag === advisorTag.CITY ? <AdvisorDashboardCity /> : null
      }
    </div>
  );
}

export default Dashboard;
