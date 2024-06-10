import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { styles } from './Style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GithubAuthButton from '../../Components/GithubAuthButton/GithubAuthButton';

const LoginPage = () => {
    GoogleSignin.configure({
        webClientId: '119563383988-079qasngsvf6rm3avcl5ceg0rerpb8a6.apps.googleusercontent.com',
      });
  
    async function onGoogleButtonPress() {
      try {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();
            console.log(idToken);
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
      } catch (error) {
        Alert.alert(error)
      }
      }

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
                <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))} style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <Image
                    style={styles.googleLogo}
                    source={require('../../Assets/images/google-icon.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <Image
                    style={styles.facebookLogo}
                    source={require('../../Assets/images/Facebook-Logo.png')}
                    />
                </TouchableOpacity>
                <GithubAuthButton/>
           </View>

        </View>
    )
}

export default LoginPage