import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomUserList = ({ displayName, photoURL, bio }) => {
    return (
        <ListItem onPress={()=>userData()} bottomDivider>
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
                    {displayName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "900" }} >
                            {bio || "This is a test subtitle"} 
                        </Text>
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomUserList

const styles = StyleSheet.create({})