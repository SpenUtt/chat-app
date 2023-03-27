import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import StartScreen from './components/start';
import ChatScreen from './components/chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useNetInfo }from '@react-native-community/netinfo';


const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyAX5tTVTSllo-vxBWjPVC_IFNmR2PLAv5k",
    authDomain: "chat-app-a81ca.firebaseapp.com",
    projectId: "chat-app-a81ca",
    storageBucket: "chat-app-a81ca.appspot.com",
    messagingSenderId: "785934217659",
    appId: "1:785934217659:web:a2a6b90aef213d05f0549e",
    measurementId: "G-CNEP5JYMJB"
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      //disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      //enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen" >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
        />
          <Stack.Screen
            name="ChatScreen"
            >
          {(props) => <ChatScreen isConnected={connectionStatus.isConnected} db={db} {...props}/>} 
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
