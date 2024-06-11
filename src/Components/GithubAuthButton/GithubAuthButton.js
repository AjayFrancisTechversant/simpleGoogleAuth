import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { styles } from './Style';
import { authorize } from 'react-native-app-auth';
import auth from '@react-native-firebase/auth';



const config = {
    clientId: 'Ov23li6b3K5eVFvXAFGU',
    clientSecret: '076c7a51d8388e06b705f884c2a4c5cfee4657b9',
    redirectUrl: 'myapp://',
    scopes: ['read:user'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint: 'https://github.com/settings/connections/applications/Ov23li6b3K5eVFvXAFGU'
    }
  };


const GithubAuthButton = () => {
const [result, setResult] = useState(null);
    
    const loginWithGitHub = async () => {
        
        try {
          const {accessToken} = await authorize(config);
          // console.log(accessToken,'accessToken');

          const githubcredential=auth.GithubAuthProvider.credential(accessToken)
          console.log(githubcredential,'githubCredential');

          return auth().signInWithCredential(githubcredential)
          // setResult(authResult);
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
        <TouchableOpacity onPress={()=>loginWithGitHub()} style={styles.logoContainer}>
            <Image style={styles.GithubLogo} source={require('../../Assets/images/Github-Logo.png')} />
        </TouchableOpacity>
    )
}

export default GithubAuthButton