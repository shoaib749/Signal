import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomDMList = ({ id, chatName, photoURL, enterChat }) => {
    const [message, setMessages] = useState([]);
    useEffect(() => {
        console.log(chatName);
    })
    return (
        <ListItem onPress={() => enterChat(id, chatName, photoURL)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKS9W8AecB8TRNh4yKf1QGSXZXp3_lZYeHlel9tG3kzw&usqp=CAU&ec=48665701"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "900" }} >
                            {message[0]?.data.displayName || "This is a test subtitle"} :
                        </Text>
                    </View>
                    <Text style={{ fontWeight: "900" }}>
                        {message[0]?.data.message}
                    </Text>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomDMList

const styles = StyleSheet.create({})