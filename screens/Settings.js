import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements"
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { initializeApp } from 'firebase/app';
import { AntDesign, SimpleLineIcons, Entypo } from "@expo/vector-icons"
import { getAuth, updateProfile } from "firebase/auth";
import { TouchableOpacity } from 'react-native';
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
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



const Settings = () => {
    // const [toggleProfile,setToggleProfile] = useState(false);
    const [imageUrl, setImageUrl] = useState(auth.currentUser.photoURL);
    const [bio, setBio] = useState("Hey i am at Ceinsys.....");
    const userData = {
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        email: auth.currentUser.email,
        bio: bio
    }

    useEffect(() => {
        const userRef = ref(refDB, "userProfile/" + auth.currentUser.displayName);
        const usersListener = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setBio(data.bio)
        });
        return () => {
            usersListener();
        }
    }, []);
    const update = () => {
        const user = auth.currentUser;
        if (imageUrl != null) {
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
        if (bio != null) {
            console.log(bio);
            set(ref(refDB, "userProfile/" + auth.currentUser.displayName), userData)
                .then(() => {
                    console.log("User data saved");
                })
                .catch((error) => {
                    console.log("Error in saving data");
                })

            setBio("");
        }
    }
    return (
        <KeyboardAvoidingView behavior='margin' style={styles.container}>
            <StatusBar style='ligth' />
            <View>
                {/* <TouchableOpacity activeOpacity={0.5}style={{marginLeft:150}} >
                    <SimpleLineIcons name="pencil" size={24} color="black" />
                </TouchableOpacity> */}
                <Image
                    source={{
                        uri: auth.currentUser.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrC-6oA9sg1_xEJRcJTACfGOnNFHsAsXn8FpEZSA&s",
                    }}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                    }}
                />

            </View>
            <View style={{ flexDirection: "row" }}>
                {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Name </Text> */}
                <Text style={{ fontSize: 24, fontWeight: "700" }}>{auth.currentUser.displayName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Email </Text> */}
                <Text style={{ fontSize: 18, fontWeight: "500" }}>{auth.currentUser.email}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {/* <Text style={{ fontSize: 14, fontWeight: "700" }} >Email </Text> */}
                <Text style={{ fontSize: 18, fontWeight: "300" }}>{bio}</Text>
            </View>

            <View style={styles.inputContainer}>
                <Input placeholder="Add Bio"
                    type="text"
                    value={bio}
                    onChangeText={text => setBio(text)
                    }
                />
                <Input placeholder="Profile Picture Url"
                    type="text"
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
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
        marginTop: 20
    },
    button: {
        width: 200,
        marginTop: 10
    },
})