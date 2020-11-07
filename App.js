
 import * as React from 'react';
 import { View, Text, StyleSheet, TextInput } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Pantry from "./pantry"

 const Tab = createMaterialBottomTabNavigator();

 const Stack = createStackNavigator();
 

 
 const HomeScreen = () => {
   return (
     <View style={styles2.MainContainer }>
       <TextInput 
           style={styles2.textInput}
           underlineColorAndroid='transparent'
           placeholder="Enter Item Here" />
     </View>
   );
 }
 
 const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pantry List</Text>
    </View>
  );
}
 

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor = '#ffffff'
      barStyle = {{backgroundColor: '#b0c4de',}}
    >
      <Tab.Screen name="Pantry List" component={Pantry} />
      <Tab.Screen name="Nearby Places" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


 const Naviagtor1 = () => {
   return (
    <Stack.Navigator 
      screenOptions = {({navigation}) => ({
      title : "Shazam For Food", 
      headerTintColor: "black",
      headerStyle: {backgroundColor: "#b0c4de"},
    })}
  >
    <Stack.Screen name="Home" component={MyTabs} />
  </Stack.Navigator>
   )
 }
 
export default function App() {
   return (
     <NavigationContainer>
      <Naviagtor1/>
     </NavigationContainer>
   );
 }
 
 

 const styles2 = StyleSheet.create({
 
  MainContainer: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
 
  row: {
    fontSize: 15,
    padding: 15
  },
 
  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 120,
    backgroundColor: "#FFFF",
  }
});