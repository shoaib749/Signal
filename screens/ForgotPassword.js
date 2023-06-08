import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";

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

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState("");

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Password reset email sent');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View>
            <KeyboardAvoidingView behavior='margin' style={styles.container}>
                <StatusBar style='ligth' />
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrC-6oA9sg1_xEJRcJTACfGOnNFHsAsXn8FpEZSA&s",
                    }}
                    style={{ width: 200, height: 200 }}
                />
                <View style={styles.inputContainer}>
                    <Input placeholder='Email'
                        autoFocus
                        type="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)} />
                    {/* <Input placeholder='Password'
                        secureTextEntry
                        type="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onSubmitEditing={handleResetPassword} /> */}

                </View>
                <Button containerStyle={styles.button} onPress={handleResetPassword} title="Update" />
                <Button containerStyle={styles.button} type='outline' title="Login" onPress={() => navigation.navigate("Login")} />
            </KeyboardAvoidingView>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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