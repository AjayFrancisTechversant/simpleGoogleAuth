import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import notifee from '@notifee/react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

const HomeScreen = ({navigation}) => {

  useEffect(()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  })

  const displayNotification = async () => {

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: '222',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: '222',
        },
      },
    })
  }

  const handleGetFCMToken=async()=>{
    const FCMToken= await messaging().getToken()
    console.log('FCMToken:',FCMToken);
  }


  const handleLogout = () => {
    GoogleSignin.signOut().then(() => console.log('google logout'))
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  
  return (
    <View>
      <Text>WELCOME</Text>
      <TouchableOpacity style={{borderRadius:5,backgroundColor:'gray',height:30,width:100,margin:10,justifyContent:'center',alignItems:'center'}} onPress={displayNotification}>
        <Text style={{color:'white'}}>notification</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{borderRadius:5,backgroundColor:'gray',height:30,width:100,margin:10,justifyContent:'center',alignItems:'center'}}  onPress={handleGetFCMToken}>
        <Text style={{color:'white'}}>getFCMToken</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={{borderRadius:5,backgroundColor:'gray',height:30,width:100,margin:10,justifyContent:'center',alignItems:'center'}}  onPress={handleLogout}>
        <Text style={{color:'white'}}>logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderRadius:5,backgroundColor:'gray',height:30,width:100,margin:10,justifyContent:'center',alignItems:'center'}}  onPress={()=>navigation.navigate('Screen1')}>
        <Text style={{color:'white'}}>Go to Screen1</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen