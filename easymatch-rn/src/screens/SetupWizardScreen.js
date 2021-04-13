
import React, {useState, Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, View, Switch, TouchableOpacity, StatusBar} from 'react-native';
import api from '../services/api';
export default function SetupWizard({navigation}) {
  const [futebol, setfutebol] = useState(false);
  const [corrida, setCorrida] = useState(false);
  const [basquete, setBasquete] = useState(false);
  const [volei, setVolei] = useState(false);
  const [natacao, setNatacao] = useState(false);

  const id = navigation.getParam('user');

  async function handleSetSports() {
    console.log(id, futebol, corrida, basquete, volei, natacao);
    const response = await api.post('/user/sport', {
      id,
      futebol,
      corrida,
      basquete,
      volei,
      natacao,
    });

    const {_id} = response.data;
    console.log(_id);
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', {user: _id});
  }

  return (
    <View>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
      <Text>Futebol</Text>
      <Switch
        onValueChange = {(value) => setfutebol(value)}
        value = {futebol}
      />
      <Text>Corrida</Text>
      <Switch
        onValueChange = {(value) => setCorrida(value)}
        value = {corrida}
      />
      <Text>Basquete</Text>
      <Switch
        onValueChange = {(value) => setBasquete(value)}
        value = {basquete}
      />
      <Text>Volei</Text>
      <Switch
        onValueChange = {(value) => setVolei(value)}
        value = {volei}
      />
      <Text>natacao</Text>
      <Switch
        onValueChange = {(value) => setNatacao(value)}
        value = {natacao}
      />

      <TouchableOpacity onPress = {handleSetSports}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
