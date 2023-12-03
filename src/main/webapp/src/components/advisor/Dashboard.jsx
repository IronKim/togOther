import React, { useEffect, useState } from 'react';

import {ADVISORTAG} from '../../constants/ADVISORTAG';
import AdvisorDashboardCity from './AdvisorDashboardCity';
import AdvisorDashboardUser from './AdvisorDashboardUser';
import AdvisorDashboardCommunity from './AdvisorDashboardCommunity';
import AdvisorDashboardPackage from './AdvisorDashboardPackage';
import { getPlace } from '../../api/AdvisorApiService';
import AdvisorDashboardPayment from './AdvisorDashboardPayment';

const Dashboard = ({styles, currentTag}) => {

  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    getPlace()
    .then(res => {
      setPlaceList(res.data);
    })
    .catch(e => console.log(e));
  }
  , []);
  
  return (
    <div className={styles.dashboard}>

      {
        currentTag === ADVISORTAG.USER && <AdvisorDashboardUser placeList={placeList}/>
      }

      {
        currentTag === ADVISORTAG.LOCATION && <AdvisorDashboardCity /> 
      }
      {
        currentTag === ADVISORTAG.COMMUNITY && <AdvisorDashboardCommunity /> 
      }
      {
        currentTag === ADVISORTAG.PACKAGE && <AdvisorDashboardPackage />
      }
      {
        currentTag === ADVISORTAG.PAYMENT && <AdvisorDashboardPayment/> 
      }
    </div>
  );
}

export default Dashboard;
