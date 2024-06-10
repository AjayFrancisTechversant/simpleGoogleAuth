import React from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { styles } from './Style';

const GithubAuthButton = () => {
  
    return (
        <TouchableOpacity style={styles.logoContainer}>
            <Image style={styles.GithubLogo} source={require('../../Assets/images/Github-Logo.png')} />
        </TouchableOpacity>
    )
}

export default GithubAuthButton