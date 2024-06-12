import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import notifee from '@notifee/react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = ({ navigation }) => {

  const displayNotification = async () => {

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: '222',
      name: 'Default Channel',
    });
    // Display a notification
    const notificationID = await notifee.displayNotification({
      id: 'notificationA',
      title: 'Hello ',
      body: 'Notification send via notifee',
      data: {},
      android: {
        channelId,
        //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: '222',
        },
      },
    })
    return notificationID
  }

  const updateNotification = async () => {
    await notifee.displayNotification({
      id: 'notificationA',
      title: 'Updated Hello ',
      body: 'Updated Notification send via notifee',
      data: {},
      android: {
        channelId:'222',
        //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: '222',
        },
      },
    })

  }

  const cancelANotification = async (notificationID) => {
    await notifee.cancelNotification(notificationID)
  }
  const cancelAllNotification = async () => {
    await notifee.cancelAllNotifications()
  }

  const handleGetFCMToken = async () => {
    const FCMToken = await messaging().getToken()
    console.log('FCMToken:', FCMToken);
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
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'green', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => displayNotification().then(notificationID => console.log(notificationID))}>
        <Text style={{ color: 'white' }}>send notification via notifee</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateNotification()} style={{ borderRadius: 5, backgroundColor: 'green', height: 50, width: 300, margin: 10, justifyContent: 'center', alignItems: 'center' }} >
        <Text style={{ color: 'white' }}>update notification using notificationID via notifee</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cancelANotification('notificationA')} style={{ borderRadius: 5, backgroundColor: 'green', height: 30, width: 300, margin: 10, justifyContent: 'center', alignItems: 'center' }} >
        <Text style={{ color: 'white' }}>cancel using notificationID via notifee</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelAllNotification} style={{ borderRadius: 5, backgroundColor: 'green', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} >
        <Text style={{ color: 'white' }}>cancel all notification via notifee</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'gray', height: 30, width: 100, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={handleGetFCMToken}>
        <Text style={{ color: 'white' }}>getFCMToken</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'gray', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Screen1')}>
        <Text style={{ color: 'white' }}>Go to Screen1(navigate)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'gray', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Screen2')}>
        <Text style={{ color: 'white' }}>Go to Screen2(navigate)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'gray', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL('myapp://Screen1')}>
        <Text style={{ color: 'white' }}>Go to Screen1 via url</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'gray', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL('myapp://Screen2')}>
        <Text style={{ color: 'white' }}>Go to Screen2 via url</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'red', height: 30, width: 100, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={handleLogout}>
        <Text style={{ color: 'white' }}>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen