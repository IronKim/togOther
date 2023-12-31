import React from 'react';
import styles from '../../css/advisorCommunity.module.css';
import View from '../community/planner/View';
import TogetherView from '../community/together/TogetherView';
import PackageResDetails from '../package/PackageResDetails';

const AdvisorDashboardModal = (props) => {
    const {onClose,type,seq} = props

    return (
        <div>
            <div className={styles.bg} onClick={() => onClose()}></div>
            <div className={styles.onModal} style={{height: type === 2 && '550px'}}>
                {type === 0 && <View seqAd={seq}/>}
                {type === 1 && <TogetherView seqAd={seq}/> }
                {type === 2 && <PackageResDetails paySeq={seq} onClose={onClose}/> }
            </div>
        </div>
    );
};

export default AdvisorDashboardModal;