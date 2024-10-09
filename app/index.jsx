import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../components/homePage.jsx'; 
import CreateNotePage from '../components/createNotePage.jsx'; 

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="CreateNote" component={CreateNotePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
