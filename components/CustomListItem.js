import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
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


const CustomListItem = ({ id, chatName, enterChat }) => {
    const [message, setMessages] = useState([]);
    useEffect(() => {
        const q = query(
            collection(db, `chats/${id}/message`),
            orderBy('timestamp', 'desc')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setMessages(messages);
        });

        return unsubscribe;
    }, [id]);
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        message[0]?.data.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "900" }} >
                            {message[0]?.data.displayName || "This is a test subtitle"} :
                        </Text>
                    </View>
                    <Text style={{ fontWeight: "900" }}>
                        {message[0]?.data.message}
                    </Text>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})