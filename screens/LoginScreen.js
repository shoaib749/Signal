import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input, Image } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("HomeScreen");
            }
        });
        return unsubscribe;
    }, []);
    const signIn = () => {
        // fetch("http://10.0.10.221:5000/user/login", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         password: password,
        //         email: email,
        //     })
        // })
        //     .then((res) => {
        //         if (res.status == 200) {
        //             console.log(res.status);
        //             return res.json();
        //         } else if (res.status == 401) {
        //             alert("User does not exist");
        //         } else if (res.status == 500) {
        //             alert("Server Error")
        //         } else if (res.status == 400) {
        //             alert("Enter correct password!");
        //         }
        //     })
        //     .then(data => {
        //         console.log(data.id);
        //         console.log(data.imageurl);
        //         console.log(data.name);
        //         console.log(data.message);
        //         console.log(data.token);
        //         navigation.replace('HomeScreen', {
        //             id: data.id,
        //             name: data.name,
        //             imageurl: data.imageurl,
        //             email: email,
        //         })
        //         // navigation.replace("HomeScreen");
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => alert(error));

    }
    return (
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
                <Input placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn} />
                <Text style={{fontWeight: "600" ,paddingHorizontal :90}} onPress={()=>navigation.navigate("ForgotPassword")}>  Forgot Password</Text>
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} type='outline' title="Register" onPress={() => navigation.navigate("Register")} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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
