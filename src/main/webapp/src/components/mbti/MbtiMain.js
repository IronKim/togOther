import React, { useState } from 'react';
import Start from './Start';
import Content from './Content';
import Result from './Result';

const MbtiMain = ({prevPage,onSubmitWrite,onMbti,inputUserData}) => {
    const[status,setStatus] = useState(0)

    const[ie,setIe] = useState([0,0])
    const[sn,setSn] = useState([0,0])
    const[tf,setTf] = useState([0,0])
    const[jp,setJp] = useState([0,0])

    const nextStatus= () => (setStatus(status+1))

    const updateType = (type) => {
        if(type[0] !== 2) {
            setIe(() => {
                const ut = ie
                ut[type[0]] += 1 
                return ut;
            });
        }
        if(type[1] !== 2) {
            setSn(() => {
                const ut = sn
                ut[type[1]] += 1 
                return ut;
            });
        }
        if(type[2] !== 2) {
            setTf(() => {
                const ut = tf
                ut[type[2]] += 1 
                return ut;
            });
        }
        if(type[3] !== 2) {
            setJp(() => {
                const ut = jp
                ut[type[3]] += 1 
                return ut;
            });
        }
    }
    const minusType = (type) => {
        if(type[0] !== 2) {
            setIe(() => {
                const ut = ie
                ut[type[0]] -= 1 
                return ut;
            });
        }
        if(type[1] !== 2) {
            setSn(() => {
                const ut = sn
                ut[type[1]] -= 1 
                return ut;
            });
        }
        if(type[2] !== 2) {
            setTf(() => {
                const ut = tf
                ut[type[2]] -= 1 
                return ut;
            });
        }
        if(type[3] !== 2) {
            setJp(() => {
                const ut = jp
                ut[type[3]] -= 1 
                return ut;
            });
        }
    }
    
    
    return (
        <div>
            {status === 0 && <Start nextStatus={nextStatus} inputUserData={inputUserData}/>}
            {status === 1 && <Content nextStatus={nextStatus} updateType={updateType} minusType={minusType}/>}
            {status === 2 && <Result ie={ie} sn={sn} tf={tf} jp={jp} onMbti={onMbti}/>}
            <button onClick={prevPage}>이전</button>&nbsp;
            <button onClick={onSubmitWrite}>완료</button>&nbsp;
        </div>
    );
};

export default MbtiMain;