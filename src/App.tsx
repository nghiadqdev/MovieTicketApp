/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { FC, createContext } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from './components/toast/FToast';
import toastService from './services/toast/toast.service';
import { configEnv } from './@config';
import RootNavigation from './screens/RootNavigation';
import { StyleSheet, StatusBar } from 'react-native';
import SigninScreen from './screens/auth/SigninScreen';

// const envConfig = configEnv();
// const AuthContext = createContext(null)

const App: FC = () => {
  const handleCompleteLoadData = () => {
    StatusBar.setHidden(false);
    // RNBootSplash.hide({ fade: true });
  };

  return (
    // <AuthContext.Provider value={createStore} >
    <SafeAreaProvider>
      <RootNavigation onCompleteLoading={handleCompleteLoadData} />
      {/* <Toast ref={(ref) => {
          toastService.setRefContainer(ref)
        }} /> */}
    </SafeAreaProvider>
    // </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%'
  }
})
export default App;
// export default codePush(codePushOptions)(App);

