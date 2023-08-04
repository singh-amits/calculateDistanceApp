import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/home';
import CalculateDistance from './src/screens/calculateDistance';
import LocationInput from './src/screens/locationInput';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Upload Profile Pic',
          }}
        />
        <Stack.Screen
          name="LocationInput"
          component={LocationInput}
          options={{
            title: 'Add Co-Ordinates',
          }}
        />
        <Stack.Screen
          name="CalculateDistance"
          component={CalculateDistance}
          options={{
            title: 'Calculate Distance',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
