import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Udaciflashcards:notifications'


export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

var objects = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}


export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(()=>{
          try{
            Notifications.cancelAllScheduledNotificationsAsync
            }catch(error){console.log(error)}});
}

function createNotification(){
    return {
        title: 'Log your stats',
        body: "👋 don't forget to take at least one quiz for today!",
        ios:{
            sound: true
        },
        android: {
           sound: true,
           priority: 'high',
           sticky: false,
           vibrate: true
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem( NOTIFICATION_KEY )
        .then(JSON.parse)
        .then( data => {
            if ( !data ){
                Notifications.requestPermissionsAsync()
                    .then( ({ status }) => {
                        console.log('Notification permissions status:',status);
                        if ( status === 'granted' ){
                            Notifications.cancelAllScheduledNotificationsAsync()
                                .catch(console.error);

                            Notifications.scheduleNotificationAsync({
                                    content: createNotification(),
                                    trigger: {
                                        hour: 20,
                                        minute: 0,
                                        repeats: true
                                    }
                                })
                                .catch(console.error);

                            Notifications.setNotificationHandler({
                                handleNotification: async () => ({
                                    shouldShowAlert: true,
                                    shouldPlaySound: false,
                                    shouldSetBadge: false,
                                })
                            })

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}
