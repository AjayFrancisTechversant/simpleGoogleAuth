import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React, {  } from 'react'
import notifee, { AndroidImportance,EventType } from '@notifee/react-native';



const Screen1 = () => {

  
  const displayNotification = async () => {

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: '3',
      name: 'Default Channel',
      importance:AndroidImportance.HIGH
    });
    // Display a notification
    const notificationID = await notifee.displayNotification({
      id: 'notificationA',
      title: 'Hello ',
      body: 'Go to Screen2',
      data: {url:'myapp://Screen2'},
      android: {
        channelId,
        //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: '3',
          
        },
      },
    })
    return notificationID
  }
  return (
    <View>
      <Text>Screen1</Text>
      <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'green', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => displayNotification().then(notificationID => console.log(notificationID))}>
        <Text style={{ color: 'white' }}>send notification via notifee</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Screen1