import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { RootNavigator } from './navigation/RootNavigator';
import { store } from './store';
import './locale/i18nConfig';
import { AuthHandler } from './Auth/AuthHandler';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <RootNavigator />
        <AuthHandler />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
