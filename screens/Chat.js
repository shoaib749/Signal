import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, doc, addDoc, serverTimestamp, orderBy, onSnapshot, query, collectionGroup } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//     apiKey: "AIzaSyDJ5FgjXvkYSx3DfX_D9pfvyWGi0wvlIHU",
//     authDomain: "chat-810fd.firebaseapp.com",
//     projectId: "chat-810fd",
//     storageBucket: "chat-810fd.appspot.com",
//     messagingSenderId: "605059293180",
//     appId: "1:605059293180:web:5f475d409b10f22f5c1c79"
//   };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

const Chat = ({ navigation, route }) => {
    const [input, setInnput] = useState('');
    const [message, setMessages] = useState([]);
    const { self } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItem: "center",
                }}>
                    <Avatar rounded source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                    }}
                    //message[0]?.data.photoURL
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            // headerLeft: () => (
            //     <TouchableOpacity>
            //         <AntDesign name="arrowleft" size={24} color="white" />
            //     </TouchableOpacity>
            // ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();
        console.log("inside")
        async function addMessageToChat(input, chatId, senderid) {
            // try {
            //     const messageRef = collection(doc(db, "chats", chatId), "message");
            //     const newMessage = {
            //         timestamp: serverTimestamp(),
            //         message: input,
            //         displayName: auth.currentUser.displayName,
            //         email: auth.currentUser.email,
            //         photoURL: auth.currentUser.photoURL
            //     };
            //     await addDoc(messageRef, newMessage);
            //     console.log("Message added successfully");
            // } catch (error) {
            //     console.error("Error adding message: ", error);
            // }
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            console.log("Sender id", senderid)
            console.log("genrating timestamp", timestamp)
            fetch("http://10.0.10.221:5000/user/addMessage", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input,
                    chatid: chatId,
                    senderid: senderid,
                    timestamp: timestamp,
                })
            })
        }
        addMessageToChat(input, route.params.id, self);
        setInnput("")
    };

    useEffect(() => {
        // const q = query(
        //     collection(db, `chats/${route.params.id}/message`),
        //     orderBy('timestamp')
        // );
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     const messages = querySnapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         data: doc.data(),
        //     }));
        //     setMessages(messages);
        //     console.log(route.params.id);
        //     console.log(messages)
        // });
        // return unsubscribe;
    }, [route.params.id])
    // console.log("messages value");
    // console.log(message);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback>
                    <>
                        <ScrollView containerStyle={{ paddingTop: 15 }}>
                            {message.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciver}>
                                        <Avatar
                                            position="absolute"
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5
                                            }}
                                            rounded
                                            size={30}
                                            bottom={-15}
                                            right={-5}
                                            source={{
                                                uri: data.photoURL
                                            }} />
                                        <Text style={styles.recieverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            rounded
                                            size={30}
                                            source={{
                                                uri: data.photoURL
                                            }}
                                        />
                                        <Text style={styles.senderText}>
                                            {data.message}
                                        </Text>
                                        <Text style={styles.senderName}>
                                            {data.displayName}
                                        </Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.fotter}>
                            {/* fotter */}
                            <TextInput
                                value={input}
                                onChangeText={text => setInnput(text)}
                                placeholder="Signal Message"
                                style={styles.textInput}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    fotter: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 10,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,

    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    reciver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    }
})