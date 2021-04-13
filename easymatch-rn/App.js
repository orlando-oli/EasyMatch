/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import Routes from './src/routes';
import firebase from 'react-native-firebase';

import {
  AsyncStorage,
} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {hasToken: false, isLoaded: false};
  }
  async componentDidMount() {
    this.checkPermission();
  }

  async checkPermission() {
    firebase.messaging().hasPermission()
        .then((enabled) => {
          if (enabled) {
            console.log('Permission granted');
            this.getToken();
          } else {
            console.log('Request Permission');
            this.requestPermission();
          }
        });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('before fcmToken: ', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('after fcmToken: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    firebase.messaging().requestPermission()
        .then(() => {
          this.getToken();
        })
        .catch((error) => {
          console.log('permission rejected');
        });
  }

  // Quando solicitar o render() antes de retornar verificar:
  // if (this.state.isLoaded)

  render() {
    return (<Routes />);
  }
}
