/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message is handled in the background', remoteMessage)
});

const AppContainer = ({isHeadless}) => {
    if(isHeadless){
        console.log('App launched by IOS in background, ignore it.')
        return null;
    }
       return  <App/>
    }


AppRegistry.registerComponent(appName, () => AppContainer);
