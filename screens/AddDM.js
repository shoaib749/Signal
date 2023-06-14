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
    const userData = (displayName, photoURL, bio) => {
        navigation.navigate("DM", {
            displayName,
            photoURL,
            bio
        })
    }
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