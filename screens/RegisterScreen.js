import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Text, Button } from 'react-native-elements';
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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

//user full iamge picker :https://stackoverflow.com/questions/70567714/cannot-able-to-upload-user-profile-react-native-firebase

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

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                updateProfile(user, {
                    displayName: name,
                    photoURL: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                }).then(() => {
                    console.log("Profile updated successfully.");
                }).catch((error) => {
                    console.log("Error updating profile:", error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                Alert.alert("Error", error.message);
            });

        // //testing for custom database 
        // fetch("http://10.0.10.221:5000/user/register",{
        //     method: "POST",
        //     headers:{
        //         Accept : "application/json",
        //         "Content-Type" : "application/json",
        //     },
        //     body : JSON.stringify({
        //         name : name,
        //         password : password,
        //         imageurl: imageUrl,
        //         email : email,
        //     })
        // })
        // .then((res)=>{
        //     console.log("This is inside the sucess block");
        //     navigation.navigate("Login");
        // })
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
                    onChangeText={text => setName(text)} />

                <Input placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)} />

                <Input placeholder="Password"
                    type="text"
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)} />

                <Input placeholder="Profile Picture Url"
                    type="text"
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
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