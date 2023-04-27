import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/AntDesign";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// console.log("db")
// console.log(db);
const AddChat = ({ navigation, route }) => {
    const { id } = route.params;
    const [input, setInput] = useState("");
    const [chatUrl, setChatUrl] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation])
    // const createChat = async () => {
    //     console.log("Inside main")

    //     // try {
    //     //     await db.collection("chats")
    //     //         .add({
    //     //             chatName: input,
    //     //         });
    //     //     navigation.goBack();
    //     // } catch (error) {
    //     //     alert(error);
    //     // }
    //     try {
    //         const docRef = await addDoc(collection(db, "chats"), {
    //             chatName: input
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //         navigation.goBack();
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //         alert("Error", e)
    //     }


    // }
    function createChat() {
        console.log(input);
        console.log(chatUrl);
        console.log(id)
        fetch("http://10.0.10.221:5000/user/addChat", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatName: input,
                chatUrl: chatUrl,
                id: id,
            })
        }).then((res) => {
            if (res.status == 200) {
                console.log(res.status);
                return res.json();
            } else if (res.status == 500) {
                alert("Database error")
            } else if (res.status == 400) {
                alert("ChatName Already exists");
            }
        }).then(data => {
            console.log(data.message);
            navigation.goBack();
        })

    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={text => setInput(text)}
                leftIcon={
                    <Icon name="wechat" size={24} color="black" />
                } />
            <Input
                placeholder='Enter Chat image url'
                value={chatUrl}
                onSubmitEditing={createChat}
                onChangeText={text => setChatUrl(text)}
            />
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