import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Text, Button } from 'react-native-elements';
// import { getAuth } from 'firebase/auth';
// import { auth } from '../firebase_connect';
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJ-TrNsUpAt63TYDeCvRTCyzqwL_uz3YM",
    authDomain: "signal-98661.firebaseapp.com",
    projectId: "signal-98661",
    storageBucket: "signal-98661.appspot.com",
    messagingSenderId: "664202538785",
    appId: "1:664202538785:web:3090796665296482839860"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        });
    }, [navigation]);
    const register = () => {
        // auth.createUserWithEmailAndPassword(email, password)
        //     // .then(authUser => {
        //     //     authUser.user.updateProfile({
        //     //         displayName: name,
        //     //         photoURL:
        //     //         imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrC-6oA9sg1_xEJRcJTACfGOnNFHsAsXn8FpEZSA&s"
        //     //     });
        //     // })
        //     .catch((error) => alert(error.message));
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)
                // ..
            });
            // console.log("inside register function")

    }
    return (
        <KeyboardAvoidingView behavior='margin' style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>Create a Signal account</Text>
            <View style={styles.innerContainer}>
                <Input placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(text) => setName(text)} />

                <Input placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(text) => setEmail(text)} />

                <Input placeholder="Password"
                    type="text"
                    value={password}
                    secureTextEntry
                    onChange={(text) => setPassword(text)} />

                <Input placeholder="Profile Picture Url"
                    type="text"
                    value={imageUrl}
                    onChange={(text) => setImageUrl(text)}
                    onSubmitEditing={register} />

            </View>
            <Button
                containerStyle={styles.button}
                title='Register'
                raised
                onPress={register} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10
    },
    innerContainer: {
        width: 300,
    }
})