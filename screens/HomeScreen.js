import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons"
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import CustomOnlineList from '../components/CustomOnlineList';
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

const HomeScreen = ({ navigation }) => {
  const [eyeVisible, setEyeVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const { displayName, photoURL } = auth.currentUser;
  const userData = {
    name: displayName,
    photoURL: photoURL,
  };

  useEffect(() => {
    const usersRef = ref(refDB, "onlineUsers");
    const usersListener = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const users = [];

      for (const userKey in data) {
        if (Object.hasOwnProperty.call(data, userKey)) {
          const user = {
            displayName: data[userKey].name,
            photoURL: data[userKey].photoURL,
          };
          users.push(user);
        }
      }
      setUsers(users);
    });

    return () => {
      usersListener();
    };
  }, []);
  const toggleEyeVisibility = () => {
    setEyeVisible(!eyeVisible);
  };

  useEffect(() => {
    console.log(userData);
  })
  useEffect(() => {
    console.log(eyeVisible);
    if (eyeVisible == true) {
      set(ref(refDB, "onlineUsers/" + auth.currentUser.displayName), userData)
        .then(() => {
          console.log("User data saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving user data: ", error);
        });
    } else {
      remove(ref(refDB, "onlineUsers/" + auth.currentUser.displayName))
        .then(() => {
          console.log("User data deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting user data: ", error);
        });
    }
  }, [eyeVisible]);
  // const { id, name, imageurl, email } = route.params;
  // console.log("name", name);
  // const senderid = id;
  // console.log("sender id", senderid);
  console.log("back")

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    async function fetchData() {
      const unsubscribe = await onSnapshot(collection(db, "chats"), (snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      return unsubscribe;
    }
    fetchData();
    // async function fetchData() {
    //   const unsubscribe = fetch("http://10.0.10.221:5000/user/showChat", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: id,
    //     })
    //   })
    //     .then((res) => {
    //       if (res.status == 200) {
    //         console.log(res.status);
    //         return res.json();
    //       } else if (res.status == 401) {
    //         alert("d");
    //       } else if (res.status == 500) {
    //         alert("Server Error")
    //       } else if (res.status == 400) {
    //         alert("Enter correct password!");
    //       }
    //     })
    //     .then((data) => {
    //       console.log(data.message);
    //       console.log(data.chats);
    //       setChats(data.chats.map((doc) => ({
    //         id: doc.chatid,
    //         chatName: doc.chatname,
    //         chaturl: doc.chaturl,
    //         senderid: doc.id,
    //       })))
    //     })
    //   return unsubscribe;
    // }

  }, []);

  useEffect(() => {
    console.log(users);
  })


  useEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri:
                  auth.currentUser.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 150,
          marginRight: 20,
        }}>
          <TouchableOpacity activeOpacity={0.5} onPress={toggleEyeVisibility}>
            {eyeVisible ? (
              <Entypo name="eye" size={24} color="green" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="send-o" size={24} color="black" onPress={() => navigation.navigate("DMHome")} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <AntDesign name="addusergroup" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Settings")}>
            <AntDesign name="setting" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, eyeVisible]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  const enterProfile = (displayName, photoURL) => {
    navigation.navigate("Profile", {
      displayName,
      photoURL
    })
  }
  return (
    <SafeAreaView>
      <ScrollView horizontal>
        {users.map(({ displayName, photoURL }) => (
          <CustomOnlineList key={displayName} displayName={displayName} photoURL={photoURL} profile={enterProfile} />
        ))}
      </ScrollView>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})