import React from 'react';

import {ADVISORTAG} from '../../constants/ADVISORTAG';
import AdvisorDashboardCity from './AdvisorDashboardCity';
import AdvisorDashboardUser from './AdvisorDashboardUser';

const Dashboard = ({styles, currentTag}) => {
  
  return (
    <div className={styles.dashboard}>

      {
        currentTag === ADVISORTAG.USER && <AdvisorDashboardUser/>
      }

      {
        currentTag === ADVISORTAG.LOCATION && <AdvisorDashboardCity /> 
      }
    </div>
  );
}

export default Dashboard;
