import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements"
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { initializeApp } from 'firebase/app';
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

const Settings = () => {
    const [imageUrl, setImageUrl] = useState("");
    const update = () => {
        const user = auth.currentUser;
        updateProfile(user, {
            photoURL: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
        })
            .then(() => {
                setImageUrl('')
                console.log("Profile pic updated")
            })
            .catch((error) => {
                console.error('Error updating profile photo:', error);
            });
    }
    return (
        <KeyboardAvoidingView behavior='margin' style={styles.container}>
            <StatusBar style='ligth' />
            <Image
                source={{
                    uri: auth.currentUser.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrC-6oA9sg1_xEJRcJTACfGOnNFHsAsXn8FpEZSA&s",
                }}
                style={{
                    width: 200,
                    height: 200,
                    marginTop: 0,
                    borderRadius: 100,
                }}
            />
            <View style={{ flexDirection: "row" }}>
                {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Name </Text> */}
                <Text style={{ fontSize: 24, fontWeight: "700" }}>{auth.currentUser.displayName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Email </Text> */}
                <Text style={{ fontSize: 18, fontWeight: "500" }}>{auth.currentUser.email}</Text>
            </View>


            <View style={styles.inputContainer}>
                <Input placeholder="Profile Picture Url"
                    type="text"
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={update}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title='Update'
                raised
                onPress={update} />
        </KeyboardAvoidingView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    },
})