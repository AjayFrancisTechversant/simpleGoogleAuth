import React, { useEffect, useState } from 'react'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import LoginPage from './src/screens/LoginPage/LoginPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';
import { Linking, PermissionsAndroid } from 'react-native';
import Screen1 from './src/screens/Screen1/Screen1'
import Screen2 from './src/screens/Screen2/Screen2'
import notifee, { EventType } from '@notifee/react-native';




const Stack = createNativeStackNavigator()

const App = () => {
 
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    foregroundHandler()   
  }, [])

  const foregroundHandler=()=>{
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification');
          break;
        case EventType.PRESS:
          console.log('User pressed notification');
          // console.log(detail.notification.data.url);
          Linking.openURL(detail.notification.data.url)
          break;
      }
    });
  }
 
  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        HomeScreen: {
          path: 'HomeScreen'
        },
        Screen1: {
          path: 'Screen1'
        },
        Screen2: {
          path: 'Screen2'
        }
      }
    },
  };

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {!user ?
          <Stack.Screen name='LoginPage' component={LoginPage} />
          :
          <>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='Screen1' component={Screen1} />
            <Stack.Screen name='Screen2' component={Screen2} />

          </>

        }
      </Stack.Navigator>

    </NavigationContainer>

  )
}

export default App