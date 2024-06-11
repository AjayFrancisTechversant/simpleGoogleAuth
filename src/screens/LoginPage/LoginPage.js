import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { styles } from './Style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
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
          const  {idToken}  = await GoogleSignin.signIn();
            // console.log(idToken);
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // console.log(googleCredential);
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

    async function onFacebookButtonPress() {
       try {
         // Attempt login with permissions
         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
         if (result.isCancelled) {
           throw 'User cancelled the login process';
         }
       
         // Once signed in, get the users AccessToken
         const data = await AccessToken.getCurrentAccessToken();
       
         if (!data) {
           throw 'Something went wrong obtaining access token';
         }
       
         // Create a Firebase credential with the AccessToken
         const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
       
         // Sign-in the user with the credential
         return auth().signInWithCredential(facebookCredential)
       } catch (error) {
        console.log(error);
       }
      }
    return (
        <View>
            <TouchableOpacity onPress={handleanonymous}>
                <Text style={[styles.underline,{alignSelf:'center',marginVertical:30}]}>Guest</Text>
            </TouchableOpacity>
           <View style={{flexDirection:'row',gap:40,justifyContent:'center'}}>
                <TouchableOpacity onPress={() => onGoogleButtonPress()} style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <Image
                    style={styles.googleLogo}
                    source={require('../../Assets/images/google-icon.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => onFacebookButtonPress()}
                style={{width:50,justifyContent:'center',alignItems:'center'}}>
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