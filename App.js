import React, { useEffect, useState } from 'react'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import LoginPage from './src/screens/LoginPage/LoginPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';


const Stack = createNativeStackNavigator()

const App = () => {


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
    <NavigationContainer>
      <Stack.Navigator>
        {!user ?
          <Stack.Screen name='LoginPage' component={LoginPage} />
          :
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
        }
      </Stack.Navigator>

    </NavigationContainer>

  )
}

export default App