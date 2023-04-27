import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat, chaturl }) => {
    return (
        <ListItem onPress={() => enterChat(id, chatName, chaturl)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chaturl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScoWK2QOwVc0cBvi4qDVk15ulVrAQ33neBjgTbTr0&s"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is a test subtitle
                    This is a test subtitle
                    This is a test subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})