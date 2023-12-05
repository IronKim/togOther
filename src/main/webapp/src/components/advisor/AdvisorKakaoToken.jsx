import React, { useEffect } from 'react';
import { getToken} from '../../api/PackageApiService';
import { useLocation, useParams } from 'react-router-dom';

const AdvisorKakaoToken = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    
    useEffect(()=>{
        getToken(code)
        .then(res => window.close())
    },[code])

    return (
        <div>

        </div>
    );
};

export default AdvisorKakaoToken;