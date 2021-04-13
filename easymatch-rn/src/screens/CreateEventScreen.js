/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
// eslint-disable-next-line no-unused-vars
import {Text, View, StyleSheet, Image,
  // eslint-disable-next-line no-unused-vars
  TextInput, StatusBar, TouchableOpacity,Button,
  KeyboardAvoidingView, SafeAreaView} from 'react-native';
import api from '../services/api';
import {Switch} from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function CreateEventScreen({navigation}) {
  const id = navigation.getParam('user');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventSport, setEventSport] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [seats, setSeats] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isPrivate, toggleIsPrivate] = useState(false);
  const [mode, setMode] = useState('');
  const [show, toggleShow] = useState(false);

  async function handleSubmit() {
    await api.put('/events', {
      name: eventName,
      local: eventLocation,
      datetime: date,
      desc: eventDescription,
      seats,
      isPrivate,
      creator: id,
      sport: 'futebol',
    });
  }

  function pickTime() {
    setMode('time');
    toggleShow(true);
  }

  function pickDate() {
    setMode('date');
    toggleShow(true);
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'>
    <Text style={styles.logoScreen}>Criar Evento</Text>
    <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
      <TextInput
        style={styles.inputTxt}
        placeholder='Nome evento'
        onChangeText={setEventName}
        value={eventName}
      />
      <TextInput
        style={styles.inputTxt}
        placeholder='Descrição do evento'
        onChangeText={setEventDescription}
        value={eventDescription}
      />
      <View style={styles.buttonsPick}>
        <TouchableOpacity style={styles.pickButton} onPress={pickDate}>
          <Text style={styles.pickText}>Selecionar Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickButton} onPress={pickTime}>
          <Text style={styles.pickText}>Selecionar Horario</Text>
        </TouchableOpacity>
      </View>

      {show && (<RNDateTimePicker
        value={date}
        mode={mode}
        onChange={(event, date) => {
          setDate(date);
          toggleShow(false);
        }}
        display='default'
      />)}

      <View style={styles.viewSitch}>
        <Text style={styles.isPrivate}>Seu evento é privado?</Text>
        <Switch
          style={styles.isPrivateSwitch}
          onValueChange={toggleIsPrivate}
          value={isPrivate}
        />
      </View>
      <TextInput
        style={styles.inputTxt}
        placeholder='quantidade de pessoas'
        onChangeText={setSeats}
        value={seats}
      />
      <TextInput
        style={styles.inputTxt}
        placeholder='local'
        onChangeText={setEventLocation}
        value={eventLocation}
      />

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Criar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container : {
    paddingTop: 30,
  },
  inputTxt : {
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
  buttonsPick : {
    flexDirection: 'row',
    justifyContent: 'center'
  },  
  pickButton : {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: 130,
    height: 40,
    margin: '5%',
    backgroundColor: 'rgba(74,0,115, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
  },
  pickText : {
    paddingBottom: '23%',
    color: '#fff',
    fontWeight: 'bold',
  },
  logoScreen : {
    paddingBottom: '5%',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(74,0,115, 0.8)',
    alignSelf: 'center'
  },
  isPrivate : {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  isPrivateSwitch : {
    alignSelf: 'center',
  },
  viewSitch : {
    width: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 25,
  },
  submit : {
    alignSelf: 'center',
    borderRadius: 12,
    width: 100,
    height: 40,
    margin: '5%',
    backgroundColor: 'rgba(74,0,115, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
  },
  submitText : {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: '8%'
  }
})