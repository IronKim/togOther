import React from 'react';

import {ADVISORTAG} from '../../constants/ADVISORTAG';
import AdvisorDashboardCity from './AdvisorDashboardCity';
import AdvisorDashboardUser from './AdvisorDashboardUser';
import AdvisorDashboardPackage from './AdvisorDashboardPackage';

const Dashboard = ({styles, currentTag}) => {
  
  return (
    <div className={styles.dashboard}>

      {
        currentTag === ADVISORTAG.USER && <AdvisorDashboardUser/>
      }

      {
        currentTag === ADVISORTAG.LOCATION && <AdvisorDashboardCity /> 
      }

      {
        currentTag === ADVISORTAG.PACKAGE && <AdvisorDashboardPackage />
      }
    </div>
  );
}

export default Dashboard;
