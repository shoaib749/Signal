import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, remove, onValue, serverTimestamp } from "firebase/database";
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
const CustomDMList = ({ id, chatName, photoURL, enterChat }) => {
    const [message, setMessages] = useState([]);
    useEffect(() => {
        const userRef = ref(refDB, "chats/" + id);
        const usersListener = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            if (data) {
                const messageArray = Object.keys(data)
                    .map((key) => ({
                        id: key,
                        data: data[key],
                    }))
                    .sort((a, b) => b.data.timestamp - a.data.timestamp); // Sort messages by timestamp in descending order
                // Update the timestamp to a readable date string
                messageArray.forEach((message) => {
                    const timestamp = message.data.timestamp;
                    const formattedDate = new Date(timestamp).toLocaleString();
                    message.data.timestamp = formattedDate;
                });
                setMessages(messageArray);
            } else {
                setMessages([]);
            }
        });

        return () => {
            usersListener();
        };
    }, [chatName]);
    useEffect(() => {
        console.log(message)
    })
    return (
        <ListItem onPress={() => enterChat(id, chatName, photoURL)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                }}
            />
            <ListItem.Content style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: "100%" }}>
                    <View>
                        <Text style={{ fontWeight: "800" }}> {chatName}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 14 }}>{message[0]?.data.timestamp}</Text>
                    </View>
                </View>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    <Text>
                        {message[0]?.data.message}
                    </Text>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    )
}

export default CustomDMList

const styles = StyleSheet.create({})