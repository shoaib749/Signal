import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = ({navigation,route}) => {
    const [displayName , photoURL] = route.params;
  return (      
    <View>
      <Text>Profile</Text>
    </View>
    
  )
}

export default Profile
            
                                                 