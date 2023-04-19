import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
const firebaseConfig = {
  apiKey: "AIzaSyAJ-TrNsUpAt63TYDeCvRTCyzqwL_uz3YM",
  authDomain: "signal-98661.firebaseapp.com",
  projectId: "signal-98661",
  storageBucket: "signal-98661.appspot.com",
  messagingSenderId: "664202538785",
  appId: "1:664202538785:web:3090796665296482839860"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const HomeScreen = ({ navigation }) => {
  console.log("back")
  const [chats, setChats] = useState([]);
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
  }, []);
  // console.log("data from db")
  // console.log(unsubscribe);
  // unsubscribe.array.forEach(doc => {
  //   console.log(id)
  //   console.log(doc.data())
  // });

  useLayoutEffect(() => {
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
          width: 80,
          marginRight: 20
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation]);

  const enterChat=(id,chatName)=>{
    navigation.navigate("Chat",{
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({id,data:{chatName}})=>(
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})