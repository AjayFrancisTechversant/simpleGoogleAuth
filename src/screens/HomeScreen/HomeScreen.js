import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {

    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return (
        <View>
            <Text>WELCOME</Text>

            <TouchableOpacity onPress={handleLogout}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen