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
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { BackgroundImage } from 'react-native-elements/dist/config'

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

const Chat = ({ navigation, route }) => {
    const [input, setInnput] = useState('');
    const [message, setMessages] = useState([]);
    const [displayNames, setDisplayNames] = useState([]);
    const { id, senderid, email } = route.params;
    useEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Avatar rounded source={{
                        uri: message[0]?.data.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                    }} />
                    <View>
                        <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                        <Text style={{ color: "white", marginLeft: 10, fontWeight: "300", fontSize: 12 }}>{displayNames.join(", ")}</Text>
                    </View>
                </View>
            ),
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
        });
    }, [displayNames, message, navigation, route.params.chatName]);

    const sendMessage = async () => {
        Keyboard.dismiss();
        // console.log("inside")
        // console.log(senderid)
        try {
            await addDoc(collection(db, 'chats', route.params.id, 'message'), {
                timestamp: serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            });

            setInnput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
        // const currentDate = new Date();
        // const timestamp = currentDate.getTime();
        // console.log("inside fetch senderId", senderid)
        // console.log("genrating timestamp", timestamp)
        // fetch("http://10.0.10.221:5000/user/addMessage", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         message: input,
        //         chatid: chatId,
        //         senderid: senderid,
        //     //         timestamp: timestamp,
        //     //     })
        //     // })
        // }
        // addMessageToChat(input, id, senderid);
        // setInnput("")
    };

    useEffect(() => {
        console.log(displayNames.join(", "));
    }, [displayNames]);
    useEffect(() => {
        const q = query(
            collection(db, `chats/${route.params.id}/message`),
            orderBy('timestamp', 'desc')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setMessages(messages);
            const distinctDisplayNames = Array.from(
                new Set(messages.map((message) => message.data.displayName))
            ).sort((a, b) => a.localeCompare(b)); // Sort the displayNames in ascending order
            setDisplayNames(prevDisplayNames => distinctDisplayNames);
        });

        return unsubscribe;
    }, [id]);

    // console.log("messages value");
    // console.log(message);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white",paddingTop: "10px" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback>
                    <>
                        <ScrollView containerStyle={{ paddingTop: 15 }}>
                            {message.map(({ id, data }) => (
                                auth.currentUser.email === data.email ? (
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
                                        <Text style={styles.senderName}>
                                            {data.timestamp?.toDate().toLocaleString()}
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
        color: "#a9e4eb"

    },
    fotter: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 10,
        position: "fixed",
        bottom: 0
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