import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { styles } from './Style';

const LoginPage = () => {

    const handleanonymous = () => {
        auth()
            .signInAnonymously()
            .then(() => {
                console.log('User signed in anonymously');
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
            });
    }
    return (
        <View>
            <TouchableOpacity onPress={handleanonymous}>
                <Text style={[styles.underline,{alignSelf:'center',marginVertical:30}]}>Guest</Text>
            </TouchableOpacity>
           <View style={{flexDirection:'row',gap:40,justifyContent:'center'}}>
                <TouchableOpacity style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <Image
                    style={styles.googleLogo}
                    source={require('../../Assets/images/google-icon.png')}
                    />
                </TouchableOpacity>
                <Text style={{alignSelf:'center'}}>OR</Text>
                <TouchableOpacity style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <Image
                    style={styles.facebookLogo}
                    source={require('../../Assets/images/Facebook-Logo.png')}
                    />
                </TouchableOpacity>
           </View>

        </View>
    )
}

export default LoginPage