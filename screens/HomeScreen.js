import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"


const HomeScreen = ({ navigation, route }) => {
  const { id, name, imageurl, email } = route.params;
  console.log("name", name);
  const senderid = id;
  console.log("sender id", senderid);
  console.log("back")
  const [chats, setChats] = useState([]);
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    // async function fetchData() {
    //   const unsubscribe = await onSnapshot(collection(db, "chats"), (snapshot) =>
    //     setChats(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),
    //       }))
    //     )
    //   );
    //   return unsubscribe;
    // }
    // fetchData();
    async function fetchData() {
      const unsubscribe = fetch("http://10.0.10.221:5000/user/showChat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        })
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.status);
            return res.json();
          } else if (res.status == 401) {
            alert("d");
          } else if (res.status == 500) {
            alert("Server Error")
          } else if (res.status == 400) {
            alert("Enter correct password!");
          }
        })
        .then((data) => {
          console.log(data.message);
          console.log(data.chats);
          setChats(data.chats.map((doc) => ({
            id: doc.chatid,
            chatName: doc.chatname,
            chaturl: doc.chaturl,
            senderid: doc.id,
          })))
        })
      return unsubscribe;
    }
    fetchData();
  }, []);

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
                  imageurl ||
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
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat", { id: id })}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation]);

  const enterChat = (id, chatName, chaturl, senderid, email) => {
    console.log("bhai bhai:", senderid);
    navigation.navigate("Chat", {
      id,
      chatName,
      chaturl,
      senderid,
      email
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({ id, chatName, chaturl, senderid, email }) => (
          <CustomListItem key={id} id={id} chatName={chatName} chaturl={chaturl} senderid={senderid} email={email} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})