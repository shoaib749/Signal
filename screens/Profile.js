import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image ,Button } from 'react-native-elements';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect } from 'react';
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
const refDB = getDatabase(app);

const Profile = ({ navigation, route }) => {
  const { displayName, photoURL } = route.params;
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userRef = ref(refDB, "userProfile/" + displayName)
    const usersListener = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setBio(data.bio);
      setEmail(data.email);
    })
    return () => {
      usersListener();
    }
  })
  return (
    <KeyboardAvoidingView behavior='margin' style={styles.container}>
      <StatusBar style='ligth' />
      <View>
        <Image
          source={{
            uri: photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrC-6oA9sg1_xEJRcJTACfGOnNFHsAsXn8FpEZSA&s",
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
        />

      </View>
      <View style={{ flexDirection: "row" }}>
        {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Name </Text> */}
        <Text style={{ fontSize: 24, fontWeight: "700" }}>{displayName}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Email </Text> */}
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{email}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Email </Text> */}
        <Text style={{ fontSize: 18, fontWeight: "300" }}>{bio}</Text>
      </View>

      <Button
        containerStyle={styles.button}
        title='Message'
        raised />
        <Text>Kal se suru hoga personal message!!!!</Text>

    </KeyboardAvoidingView>

  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    width: 300,
    marginTop: 20
  },
  button: {
    width: 200,
    marginTop: 10
  },
})