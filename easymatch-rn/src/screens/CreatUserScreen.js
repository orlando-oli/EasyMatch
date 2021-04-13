/* eslint-disable react-native/no-color-literals */
/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api.js';

export default function CreatUserScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [showPicker, setPickerVisibility] = useState(false);
  const [password, setPassword] = useState('');

  function dateString(date) {
    month = date.getMonth() + 1;
    return date.getDate() + '/' + month + '/' + date.getFullYear();
  }

  async function handleSetNewUser() {
    const response = await api.put('/users', {
      email,
      name,
      birthdate: date,
      password,
    });
    const {_id} = response.data;
    console.log(_id);
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Setup', {user: _id});
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <Text style={styles.logoScreen}>Criar Conta</Text>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
      <TextInput
        autoCorrect={false}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TouchableOpacity
        style={styles.inputDate}
        onPress={(event) => setPickerVisibility(true)}>
        <Text>
          {(() => {
            if (!date) {
              return 'data de nascimento';
            } else {
              return dateString(date);
            }
          })()}
        </Text>
        {showPicker && (
          <RNDateTimePicker
            value={(() => {
              return date ? date : setDate(new Date());
            })()}
            mode={'date'}
            onChange={(event, date) => {
              setDate(date);
              setPickerVisibility(false);
            }}
            display="default"
          />
        )}
      </TouchableOpacity>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite sua Senha"
        placeholderTextColor="#999"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSetNewUser}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 48,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    color: '#000',
    paddingHorizontal: 20,
    marginHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 12,
    width: 100,
    height: 40,
    margin: '5%',
    backgroundColor: 'rgba(74,0,115, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 25,
  },
  inputDate: {
    width: 150,
    height: 40,
    paddingLeft: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 25,
  },
  logoScreen : {
    paddingBottom: '30%',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(74,0,115, 0.8)',
    alignSelf: 'center'
  },
});
