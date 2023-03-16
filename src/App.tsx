import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { RootNavigator } from './navigation/RootNavigator';
import { store } from './store';
import './locale/i18nConfig';
// import { useSendFCMToken } from './utils/hooks/useSendFCMToken';

const App = () => {
  // useSendFCMToken();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
