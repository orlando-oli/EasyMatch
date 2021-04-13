/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import api from '../services/api';
import { SafeAreaView } from 'react-navigation';
import Geolocation from "@react-native-community/geolocation";

export default function MainScreen({navigation}) {
  const id = navigation.getParam('user');
  const [sport, setSport] = useState('');
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    async function getPosition(){
      Geolocation.getCurrentPosition(
        pos => {
          setError("");
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        e => setError(e.message)
        );
    }
    getPosition();
  }, [])


  async function EasyMatch() {
    try {
      const response = await api.put('/events/easymatch', {
        userId: id,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e.request._response);
    }
  }

  async function sportFilter(sportID) {
    setSport(sportID);
    navigation.navigate('FeedBySport', {sport: sportID});
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <View style={styles.sportConteiner}>
        <Text style={styles.logoMain}>EasyMatch</Text>
        <View style={styles.sportButtons}>
          <TouchableOpacity
            style={styles.sportButton}
            onPress={() => sportFilter('5d6be01f1c9d4400001ad178')}>
            <Text style={styles.buttonText}>Futebol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sportButton}
            onPress={() => sportFilter('5d6be04f1c9d4400001ad17a')}>
            <Text style={styles.buttonText}>Basquete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sportButton}
            onPress={() => sportFilter('5d6be09d1c9d4400001ad180')}>
            <Text style={styles.buttonText}>Corrida</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sportButtons}>
          <TouchableOpacity
            style={styles.sportButton}
            onPress={() => sportFilter('5d6be0671c9d4400001ad17c')}>
            <Text style={styles.buttonText}>Natação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sportButton}
            onPress={() => sportFilter('5d6be0801c9d4400001ad17e')}>
            <Text style={styles.buttonText}>Vôlei</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.easyMatchButton}
        onPress={() => Alert.alert(
          'Inscrição no evento',
          'Deseja ser inscrito neste evento?',
          [
            {text: 'Não', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Sim', onPress: ()  => EasyMatch()},
          ],
          { cancelable: false }
        )}
      >
          <Text style= {styles.easyMatchText}>Vamos Jogar!!!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEventScreen')}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  fab: {
    height: 50,
    width: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(74,0,115, 0.8)',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
  sportButtons: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  sportConteiner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '60%',
    paddingBottom: '10%',
  },
  sportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '50%',
    height: 40,
    margin: '5%',
    elevation: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(74,0,115, 0.8)',
  },
  buttonText: {
    paddingBottom: '17%',
    fontWeight: 'bold',
    color: 'rgba(74,0,115, 0.8)',
  },
  logoMain: {
    paddingBottom: '5%',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(74,0,115, 0.8)',
  },
  easyMatchButton: {
    marginTop: '50%',
    width: '75%',
    height: '45%',
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: '#rgba(74,0,115, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 12,
  },
  easyMatchText: {
    paddingTop: '50%',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#rgba(74,0,115, 0.8)',
  },
});
