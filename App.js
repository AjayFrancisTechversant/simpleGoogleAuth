import React, { useEffect, useState } from 'react'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import LoginPage from './src/screens/LoginPage/LoginPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Screen1 from './src/screens/Screen1/Screen1'
import Screen2 from './src/screens/Screen2/Screen2'

// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const Stack = createNativeStackNavigator()

const App = () => {
  useEffect(()=>{
    // getFCM()
  },[])

  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
     screens:{
      HomeScreen:{
        path:'HomeScreen'
      },
      Screen1:{
        path:'Screen1'
      },
      Screen2:{
        path:'Screen2'
      }
     }
    },
  };
  

  // const getFCM=async()=>{
  //   try {
  //     const fcmToken=await messaging().getToken()
  //     console.log(fcmToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


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