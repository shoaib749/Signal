import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/AntDesign";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJ-TrNsUpAt63TYDeCvRTCyzqwL_uz3YM",
    authDomain: "signal-98661.firebaseapp.com",
    projectId: "signal-98661",
    storageBucket: "signal-98661.appspot.com",
    messagingSenderId: "664202538785",
    appId: "1:664202538785:web:3090796665296482839860"
};
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const db = firebase.firestore();
console.log("db")
console.log(db);
const AddChat = ({ navigation }) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation])
    const createChat = async () => {
        console.log("Inside main")

        // try {
        //     await db.collection("chats")
        //         .add({
        //             chatName: input,
        //         });
        //     navigation.goBack();
        // } catch (error) {
        //     alert(error);
        // }
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                chatName: input
            });
            console.log("Document written with ID: ", docRef.id);
            navigation.goBack();
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error", e)
        }


    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onSubmitEditing={createChat}
                onChangeText={text => setInput(text)}
                leftIcon={
                    <Icon name="wechat" size={24} color="black" />
                } />
            <Button onPress={createChat} title="Create new chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    }
})