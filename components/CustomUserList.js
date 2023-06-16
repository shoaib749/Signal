import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
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
const CustomUserList = ({ displayName, photoURL, bio, userData }) => {    return (
        <ListItem onPress={() => userData(displayName, photoURL)} key={displayName} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {displayName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "900" }} >
                            {bio || "This is a test subtitle"}
                        </Text>
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomUserList;

const styles = StyleSheet.create({});
