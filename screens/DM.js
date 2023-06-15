import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import moment from 'moment';
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { getAuth, updateProfile } from "firebase/auth";
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { initializeApp } from 'firebase/app';
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { StatusBar } from 'react-native'
import { getDatabase, ref, set, remove, onValue, serverTimestamp } from "firebase/database";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
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
const DM = ({ navigation, route }) => {
    const [input, setInput] = useState('');
    const [message, setMessages] = useState([]);
    const { displayName, photoURL, chatName } = route.params;
    console.log("route data:",displayName + " " + photoURL + " " + chatName)
    const messageData = {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
    }
    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    // useEffect(() => {
    //     const userRef = ref(refDB, "chats/" + chatName);
    //     const usersListener = onValue(userRef, (snapshot) => {
    //         const data = snapshot.val();

    //         if (data) {
    //             const messageArray = Object.keys(data).map((key) => ({
    //                 id: key,
    //                 data: data[key],
    //             }));
    //             setMessages(messageArray);
    //         } else {
    //             setMessages([]);
    //         }
    //     })
    //     return () => {
    //         usersListener();
    //     }
    // }, [chatName])
    useEffect(() => {
        const userRef = ref(refDB, "chats/" + chatName);
        const usersListener = onValue(userRef, (snapshot) => {
            const data = snapshot.val();

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

    
    const sendMessage = async () => {
        Keyboard.dismiss();
        const timestamp = new Date().getTime();
        console.log("ChatName:", chatName);
        set(ref(refDB, "chats/" + chatName + "/" + timestamp), messageData)
            .then(() => {
                console.log("Chat send");
            })
            .catch((error) => {
                console.log("Error in saving message")
            })
        setInput("")
    }
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
                        uri: photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                    }} />
                    <View>
                        <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{displayName}</Text>
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
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: "10px" }}>
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
                                            {data.timestamp ? moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a') : ''}
                                        </Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.fotter}>
                            {/* fotter */}
                            <TextInput
                                value={input}
                                onChangeText={text => setInput(text)}
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

export default DM

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