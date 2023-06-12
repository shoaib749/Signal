import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'

const CustomOnlineList = ({ displayName, photoURL, profile }) => {
    return (
        <ListItem onPress={() => profile(displayName, photoURL)} key={displayName} bottomDivider>
            <View style={{ padding: "5px" }} >
                <View style={{ flex: 1, alignItems: "center", }}>
                    <Avatar
                        rounded
                        containerStyle={{ borderWidth: 2, borderColor: 'green' }}
                        source={{
                            uri: photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                        }}

                    />
                </View>
                <Text style={{ fontSize: 10 }}>{displayName}</Text>
            </View>
        </ListItem>
    )
}

export default CustomOnlineList

const styles = StyleSheet.create({})