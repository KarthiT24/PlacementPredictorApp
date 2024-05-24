import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './/frontend/screens/HomeScreen';
import PredictionViewScreen from './frontend/screens/PredictionViewScreen';
import App from './App';  // Your main App component
import UploadApp from './frontend/screens/UploadScreen';
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PredictionScreen" component={PredictionViewScreen} options={{headerShown:false}}/>
        <Stack.Screen name="UploadScreen" component={UploadApp} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
