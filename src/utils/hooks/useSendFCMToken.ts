import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import Config from 'react-native-config';

export const useSendFCMToken = () => {
  useEffect(() => {
    sendFCMToken();
  }, []);

  const sendFCMToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      await axios.post(`${Config.API_URL}/chat/register-fcm-token`, { token });
    } catch (error) {
      console.log('ERROR_SEND_FCM_TOKEN', error);
    }
  };
};
