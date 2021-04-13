import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {View, SafeAreaView, Text, Button, StyleSheet, StatusBar, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import api from '../services/api';

export default function UserPage({navigation}){
  const id = navigation.getParam('user');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadUser() {
      const id = await AsyncStorage.getItem('user');
      console.log(id)
      const response = await api.put('/userId', {
        id: id,
      })
      console.log(response.data)
      setName(response.data.name);
      setAge(response.data.birthdate);
      setEmail(response.data.email);
    }
    loadUser();
  }, [id])

  async function handleUpdate(){
    navigation.navigate('UpdateInfo')
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.infos}>nome: {name}</Text>
      <Text style = {styles.infos}>data de nascimento: {age}</Text>
      <Text style = {styles.infos}>email: {email}</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateTxt}>ATUALIZAR</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  
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
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 40,
    width: 80,
  },
  updateBtn: {
    backgroundColor: 'rgba(74,0,115, 0.8)',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 30,
    width: '100%',
    bottom: 0,
  },
  updateTxt: {
    fontWeight: 'bold',
    color: '#fff'
  },
  infos :{
    paddingVertical: 15,
  }
})