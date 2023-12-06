import React, { useEffect, useState } from 'react';
import { getUserLikingPlace } from '../../api/UserApiService';
import { getPlace } from '../../api/PlaceApiService';
import { useUserStore } from '../../stores/mainStore';
import Liking from '../../css/Liking.module.css';
import { useNavigate } from 'react-router-dom';
import LikingPlaceLike from './LikingPlaceLike';

const MypageLikingPlace = () => {
    const { user, getUserByToken } = useUserStore();
    const [likingList, setLikingList] = useState([]);
    const [userPlaceLike, setUserPlaceLike] = useState(user.likingPlace);
    const navigate = useNavigate();
    
    useEffect(() => {
        setUserPlaceLike(user.likingPlace);
      },[user])
      
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getUserLikingPlace(user.userSeq);
            const dataArray = res.data.split(',').map(Number);

            let placeDTO = [];

            await Promise.all(
              dataArray.map(async (item) => {
                if(item !== 0) {
                  const res2 = await getPlace(item);
                  placeDTO.push(res2.data);
                }
              })
            );
      
            setLikingList(placeDTO)
          } catch (error) {
            console.error("Error during data fetching:", error);
          }
        };
      
        fetchData();
      }, [user.userSeq]);

    const onToPlace = (placeSeq) => {
        navigate(`/info/place/${placeSeq}`);
    };

    return (
        <div>
            <p className={Liking.tagName}>관심 장소</p>
            <hr className={Liking.hr} />
            <div className={Liking.divtotal}>
                {
                likingList.map((item, index) => (
                    <div className={Liking.imgtotal} key={index}>
                        <div>
                            <div className={Liking.imgDiv}>
                                <img className={Liking.image} src={item.image} alt="Place" onClick={() => onToPlace(item.placeSeq)}/>
                                <p className={Liking.title}>{item.name}</p>
                                {user.name === "" ?  '' : <LikingPlaceLike 
                                placeSeq={item.placeSeq} 
                                isTrue={user.likingPlace === null ?  false: userPlaceLike.includes(item.placeSeq)} 
                                userPlaceLike={userPlaceLike} setUserPlaceLike={setUserPlaceLike}
                                />}
                            </div> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MypageLikingPlace;
