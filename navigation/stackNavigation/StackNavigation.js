import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screeens/Login';
import SignUp from '../../screeens/SignUp';
import Welcome from '../../screeens/Welcome';
import Home from '../../screeens/Home';
import { UserProvider } from '../../context/UserContext'; // Import the UserProvider
import { CountProvider } from '../../context/CountContext';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    // Wrap your navigator inside the UserProvider so that the user context is accessible across screens
    <UserProvider>
      <CountProvider>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </CountProvider>
    </UserProvider>
  );
};

export default StackNavigation;
