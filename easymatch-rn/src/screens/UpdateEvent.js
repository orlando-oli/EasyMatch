import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {View,SafeAreaView, Text, Button, StyleSheet, StatusBar, TextInput, KeyboardAvoidingView} from 'react-native'
import api from '../services/api';

export default function UpdateEvent({navigation}){
  const eventId = navigation.getParam('eventId');
  const [name, setName] = useState('');
  const [local, setLocal] = useState('');
  const [datetime, setDatetime] = useState('');
  const [desc, setDesc] = useState('');
  const [seats, setSeats] = useState('');

  async function handleSubmit() {
    await api.put('/events/update', {
      name: name,
      local: local,
      datetime: datetime,
      desc: desc,
      seats: seats,
    });
  }
  
  useEffect(() => {
    async function loadUser() {
      const response = await api.put('/events/search/:' + eventId)
      setName(response.data.name);
      setLocal(response.data.local);
      setDatetime(response.data.datetime);
      setDesc(response.data.desc);
      setSeats(response.data.seats);
    }
    loadUser();
  }, [eventId])

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'>
        <TextInput
          Style={styles.input}
          placeholder='Nome'
          value={name}
        />
    <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
        <TextInput
          Style={styles.input}
          placeholder='Local'
          value={local}
        />
        <TextInput
          Style={styles.input}
          placeholder='Datetime'
          value={datetime}
        />
        <TextInput
          Style={styles.input}
          placeholder='Descrição'
          value={desc}
        />
        <TextInput
          Style={styles.input}
          placeholder='seats'
          value={seats}
        />
      <Button title='submeter!' onPress={handleSubmit}/>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  header: {
      marginTop: 50,
      height: 150,
      alignItems: 'center',
  },
  imgSection:{
      height: 100,
      width: 100,
      borderRadius: 200,
      backgroundColor: 'rgba(74,0,115, 0.8)'
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 30,
  }
})