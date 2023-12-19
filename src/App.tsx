/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { PhoneAuth } from 'auth';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { EmailVerification } from 'email-verification';
import { Text } from 'react-native';
import { deepLinkingOptions } from 'deepLinkingOptions';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  // Handle login
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      console.log('FIREBASE USER', user);
      // setFirebaseUser(user);
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    } else {
      console.log('UNDEFINED FIREBASE USER');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer
      linking={deepLinkingOptions}
      fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={PhoneAuth} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
