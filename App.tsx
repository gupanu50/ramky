/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from '../ramky-reactnative/src/Redux/Store';
import Navigator from '../ramky-reactnative/src/Navigator';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'rnative-splash';

const App = (props) => {
  SplashScreen.close({
    animationType: SplashScreen.animationType.scale,
    duration: 850,
    delay: 500,
  });

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigator />
        <FlashMessage
          type={'danger'}
          duration={5000}
          position={
            Platform.OS === 'ios'
              ? 'top'
              : { top: StatusBar.currentHeight, left: 0, right: 0 }
          }
          floating={Platform.OS !== 'ios'}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
