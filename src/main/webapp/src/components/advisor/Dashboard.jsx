import React, { useEffect, useState } from 'react';

import {ADVISORTAG} from '../../constants/ADVISORTAG';
import AdvisorDashboardCity from './AdvisorDashboardCity';
import AdvisorDashboardUser from './AdvisorDashboardUser';
import AdvisorDashboardPackage from './AdvisorDashboardPackage';
import { getPlace } from '../../api/AdvisorApiService';

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
        currentTag === ADVISORTAG.PACKAGE && <AdvisorDashboardPackage />
      }
    </div>
  );
}

export default Dashboard;
