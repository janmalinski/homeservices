import React, { useEffect } from 'react';
import axios from 'axios';
import Config from 'react-native-config';

import { useAppSelector } from '@src/store';

const useRegisterFCMToken = () => {
    const userId = useAppSelector(state => state.user.user?.id);
    const fcmToken = useAppSelector(state => state.user.fcmToken);

    useEffect(() => {
      if(fcmToken !== '' && userId !== ''){
        registerFCMToken();
      }
    }, [userId, fcmToken]);
    
    const registerFCMToken = async() => {
        try {
          await axios.post(`${Config.API_URL}/room/register-fcm-token`, { fcmToken, receiverId: userId });
        } catch (error) {
          console.log('ERROR_SEND_FCM_TOKEN', error);
        }
      };

}

export default useRegisterFCMToken;
