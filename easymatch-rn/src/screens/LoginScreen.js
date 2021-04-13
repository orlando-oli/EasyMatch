/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function tpMain() {
    navigation.navigate('Main', {user: 'caique'});
  }

  async function handleLogin() {
    console.log(userName, password);
    try {
      const response = await api.put('/user', {
        email: userName,
        password,
      });

      const {_id} = response.data;
      console.log(_id);
      await AsyncStorage.setItem('user', _id);
      navigation.navigate('Main', {user: _id});
    } catch (e) {
      console.log(e.request._response.error);
    }
  }

  function handleCreate() {
    navigation.navigate('CreatUser');
  }

  return (
    <View style={loginScreen.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <KeyboardAvoidingView behavior="padding" style={{paddingBottom: 10}}>
        <View style={loginScreen.logoContainer}>
          <Text style={loginScreen.appName}> EasyMatch </Text>
        </View>
        <TextInput
          style={loginScreen.textInput}
          placeholder="Username or Email"
          name="email"
          onChangeText={(userName) => setUserName(userName)}
          value={userName}
        />
        <TextInput
          secureTextEntry={true}
          style={loginScreen.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <View style={loginScreen.submitButtonContainer}>
          <TouchableOpacity
            style={loginScreen.submitButton}
            onPress={handleLogin}>
            <Text style={loginScreen.submitButtonText}>Go!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={loginScreen.loginOptions}>
        <TouchableOpacity style={loginScreen.loginWithButton} onPress={tpMain}>
          <Text style={loginScreen.loginWithButtonText}>Tp Main</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={loginScreen.loginWithButton}
          onPress={handleCreate}>
          <Text style={loginScreen.loginWithButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Style
export const loginScreen = StyleSheet.create({
  loginWithButton: {
    height: 34,
    color: 'rgba(74,0,115, 0.8)',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
  },
  loginWithButtonText: {
    color: 'rgba(74,0,115, 0.8)',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '700',
  },
  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 32,
  },
 
  newAccount: {
    color: '#eee',
    marginTop: 8,
  },
  submitButtonContainer: {
    marginHorizontal: 32,
  },
  submitButtonText: {
    color: 'rgba(255,255,255, 1)',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '700',
  },
  submitButton: {
    height: 48,
    color: 'rgba(74,0,115, 0.8)',
    marginBottom: 32,
    borderWidth: 1,
    width: 100,
    borderColor: 'rgba(74,0,115, 0.8)',
    backgroundColor: 'rgba(74,0,115, 0.8)',
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center'
  },
  textInput: {
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    color: '#000',
    paddingHorizontal: 20,
    marginHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
  },
  logoContainer: {
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoImage: {
    width: 128,
    height: 128,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
  },
  appName: {
    margin: 24,
    paddingTop: -20,
    paddingBottom: 40,
    fontSize: 22,
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(74,0,115, 0.8)',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginHorizontal: 32,
    marginBottom: 10,
  },
});
