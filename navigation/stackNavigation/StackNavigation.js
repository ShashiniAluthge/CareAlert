import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screeens/Login';
import SignUp from '../../screeens/SignUp';
import Welcome from '../../screeens/Welcome';
import Home from '../../screeens/Home';
import { UserProvider } from '../../context/UserContext';
import { CountProvider } from '../../context/CountContext';
import CardDetails from '../../screeens/CardDetails';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (

    <UserProvider>
      <CountProvider>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CardDetails" component={CardDetails} />

        </Stack.Navigator>
      </CountProvider>
    </UserProvider>
  );
};

export default StackNavigation;
