import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import HomeHeader from './components/Header/HomeHeader';
import Details from './pages/Details';
import NewCrime from './pages/NewCrime';
import Confirmation from './pages/Confirmation';
import SharedHeader from './components/Header/SharedHeader';

const Stack = createStackNavigator();
function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 67,
            backgroundColor: '#FCFC99',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => <HomeHeader />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTitle: (props) => <SharedHeader title="Crime details" />,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="NewCrime"
          component={NewCrime}
          options={{
            headerTitle: (props) => <SharedHeader title="New crime" />,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={{
            headerTitle: (props) => <SharedHeader title="confirmation?" />,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
