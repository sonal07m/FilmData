import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";
import MainNavigator from './src/navigator/navigator';
import rootReducer from "./src/reducers";
import logger from 'redux-logger'

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const middlewareList = [thunk, logger]

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(...middlewareList));
const persistor = persistStore(store);
const App = () => {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar translucent backgroundColor={"transparent"} />
          <MainNavigator />
          <FlashMessage position={"top"} />
        </PersistGate>
      </Provider>
  )
}
export default App;