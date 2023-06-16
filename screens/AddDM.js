import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { useEffect } from 'react';
import CustomUserList from '../components/CustomUserList';

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
const AddDM = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [nameList, setNameList] = useState([]);
    const [chatName, setChatName] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add people",
            headerBackTitle: "Chats",
        });
    }, [navigation])
    useEffect(() => {
        const userProfile = ref(refDB, "userProfile");
        const usersListners = onValue(userProfile, (snapshot) => {
            const data = snapshot.val();
            const users = [];
            for (const userKey in data) {
                if (Object.hasOwnProperty.call(data, userKey)) {
                    const user = {
                        displayName: data[userKey].name,
                        photoURL: data[userKey].photoURL,
                        bio: data[userKey].bio,
                    };
                    users.push(user);
                }
            }
            setUsers(users);
        });

        return () => {
            usersListners();
        };
    }, [])
    useEffect(() => {
        
        const chatRef = ref(refDB, "chats/");
        const chatListener = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            setNameList(Object.keys(data));
        });

        return () => {
            chatListener();
        }
    }, []);
    const userData = (displayName, photoURL) => {
        const init = auth.currentUser.displayName + "0" + displayName;
        setChatName(init)
        console.log("bolte to bula leya ha ")
        
        const data = {
            chatName: chatName,
            chatPerson: displayName,
            chatPersonPhotURL: photoURL
        }
        const data1 = {
            chatName: chatName,
            chatPerson: auth.currentUser.displayName,
            chatPersonPhotURL: auth.currentUser.photoURL
        }
        const test = {}
        const secondChatName = displayName + "0" + auth.currentUser.displayName;
        console.log("Second Name :", secondChatName)
        let chatExists = false;
        let updatedChatName = chatName;
        console.log(nameList);
        for (const name of nameList) {
            if (name === chatName) {
                console.log("Inside the first if");
                chatExists = true;
            }
            if (name === secondChatName) {
                chatExists = true;
                console.log("Inside the second if");
                updatedChatName = secondChatName;
                console.log("Second Chat Name:", updatedChatName);
            }
        }
        if (!chatExists) {
            set(ref(refDB, "userProfile/" + auth.currentUser.displayName + "/" + "chats/" + chatName + "/"), data)
                .then(() => {
                    console.log("Success in creator");
                })
                .catch((error) => {
                    console.log("Error", error);
                });
            set(ref(refDB, "userProfile/" + displayName + "/" + "chats/" + chatName + "/"), data1)
                .then(() => {
                    console.log("Success in second creator");
                })
                .catch((error) => {
                    console.log("Error", error);
                });
            set(ref(refDB, "chats/" + chatName), test)
                .then(() => {
                    console.log("New Chat is added to the chats table:", chatName);
                })
                .catch((error) => {
                    console.log("Failed with error:", error);
                });
        } else {
            console.log("Chat already exists");
            console.log("Inside the else block ", updatedChatName);
        }
        console.log("final chatName", updatedChatName);
        navigation.navigate("DM", {
            displayName: displayName,
            photoURL: photoURL,
            chatName: updatedChatName
        });
    };
    return (
        <SafeAreaView>
            <ScrollView >
                {users.map(({ displayName, photoURL, bio }) => (
                    <CustomUserList key={displayName} displayName={displayName} photoURL={photoURL} bio={bio} userData={userData} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddDM

const styles = StyleSheet.create({})