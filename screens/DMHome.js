import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import CustomListItem from '../components/CustomListItem';
import CustomDMList from '../components/CustomDMList';

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

const DMHome = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 100, marginLeft: 10 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate("HomeScreen") }}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{
                                uri:
                                    auth.currentUser?.photoURL ||
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
                    width: 100,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("addDM")}>
                        <AntDesign name="adduser" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    useEffect(() => {
        const userRef = ref(refDB, "userProfile/" + auth.currentUser.displayName + "/chats/");
        const usersListners = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const chatList = [];
            if (data) {
                for (const userKey in data) {
                    if (Object.hasOwnProperty.call(data, userKey)) {
                        const list = {
                            chatName: data[userKey].chatName,
                            chatPerson: data[userKey].chatPerson,
                            chatPhotoURL: data[userKey].chatPersonPhotURL
                        }
                        chatList.push(list);
                    }
                }
                setChatList(chatList);
            }
        });
        return () => {
            usersListners();
        };
    }, []);

    // useEffect(() => {
    //     chatList.forEach((chat) => {
    //         const chatRef = ref(refDB, "chats/" + chat);
    //         const chatListener = onValue(chatRef, (snapshot) => {
    //             const data = snapshot.val();
    //             const messages = [];
    //             if (data) {
    //                 for (const userKey in data) {
    //                     if (Object.hasOwnProperty.call(data, userKey)) {
    //                         const message = {
    //                             displayName: data[userKey].displayName,
    //                             photoURL: data[userKey].photoURL,
    //                             message: data[userKey].message,
    //                         };
    //                         messages.push(message);
    //                     }
    //                 }
    //                 setChats(messages);

    //             } else {
    //                 setChats([]);
    //             }
    //         });
    //         return () => {
    //             chatListener();
    //         };
    //     });
    // }, [chatList]);



    const enterChat = (chatName, chatPerson, chatPhotoURL) => {
        navigation.navigate("DM", {
            chatName: chatName,
            displayName: chatPerson,
            photoURL: chatPhotoURL
        });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                {chatList.map(({ chatName, chatPerson, chatPhotoURL }) => (
                    <CustomDMList key={chatName} id={chatName} chatName={chatPerson} photoURL={chatPhotoURL} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DMHome;

const styles = StyleSheet.create({});
