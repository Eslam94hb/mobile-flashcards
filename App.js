import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/decks'
import AddDeck from './components/addDeck'
import Quiz from './components/quiz'
import AddCard from './components/addCard'
import Result from './components/Result'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Deck  from './components/deck'
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { setLocalNotification } from './Utilts/helpers'

const Tab = createBottomTabNavigator();
function TabNavigator(navigation) { 
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Decks') {
              const color = focused? "black" : "grey"
              return <MaterialCommunityIcons name="cards" size={24} color={color} />
            }        
            // You can return any component that you like here!
            const color1 = focused? "black" : "grey"
            return <MaterialIcons name="add-box" size={24} color={color1} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >


        <Tab.Screen name="Decks" component={Decks}  navigationOptions/>
        <Tab.Screen name="Add Deck" component={AddDeck} />
      </Tab.Navigator>
  );
}
const Stack = createStackNavigator();


export default class App extends React.Component {
    componentDidMount() {
    setLocalNotification()
  }
  render(){
  return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
            <Stack.Navigator> 
                <Stack.Screen name="tabs" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Deck" component={Deck} />
                <Stack.Screen name="AddCard" component={AddCard} />
                <Stack.Screen name="Quiz" component={Quiz} />
                <Stack.Screen name="Result" component={Result} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );}
}
