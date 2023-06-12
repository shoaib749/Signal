import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChat from './screens/AddChat';
import Chat from './screens/Chat';
import Settings from './screens/Settings';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { useEffect } from 'react';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';
import DM from './screens/DM';
const firebaseConfig = {
  apiKey: "AIzaSyAJ-TrNsUpAt63TYDeCvRTCyzqwL_uz3YM",
  authDomain: "signal-98661.firebaseapp.com",
  projectId: "signal-98661",
  storageBucket: "signal-98661.appspot.com",
  databaseURL: "https://signal-98661-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "664202538785",
  appId: "1:664202538785:web:3090796665296482839860"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const refDB = getDatabase(app);

export default function App() {
  const Stack = createStackNavigator();
  const globalScreenOption = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: "white", },
    headerTintColor: "white",
    // headerTitleAlign: "center"
  };

  useEffect(() => {
    let sessionTimeout;
    const startSessionTimeout = () => {
      sessionTimeout = setTimeout(() => {
        remove(ref(refDB, "onlineUsers/" + auth.currentUser.displayName))
          .then(() => {
            console.log("User data deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting user data: ", error);
          });
      }, 300000);

    };
    // Function to reset the session timeout timer
    const resetSessionTimeout = () => {
      clearTimeout(sessionTimeout);
      startSessionTimeout();
    };
    // Add event listeners to track user activity and reset session timeout
    window.addEventListener('mousemove', resetSessionTimeout);
    window.addEventListener('keydown', resetSessionTimeout);
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', resetSessionTimeout);
      window.removeEventListener('keydown', resetSessionTimeout);
    };
  })

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOption}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChat} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="DM" component={DM} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
