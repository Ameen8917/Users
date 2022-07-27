import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Users from './screens/Users';
import AddUser from './screens/AddUser';
import { UsersProvider } from './context/usersContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <UsersProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Users}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="addUser"
              component={AddUser}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UsersProvider>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})
