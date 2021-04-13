/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar} from 'react-native';
import api from '../services/api';

let bg_color_cardHora = '#7b1fa2'
let bg_color_cardVagas = '#7b1fa2'
let bg_color_cardData = '#7b1fa2'
let bg_color_card = '#fdfdfd'
let bg_color_play = '#711c94'
let txt_color_light = '#e5e5e5'
let txt_color_vagas_dsp = '#b2fab4'
let txt_color_bright = '#fff'
let txt_color_cardTitle = '#333'

export default function feedScreen({ navigation }){
  const id = navigation.getParam('user');
  const sport = navigation.getParam('sport');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents(){
      try{
      const response = await api.put('/events/bysport', {
        sport,
      })  
        const allEvents = Array.from(response.data);
        setEvents(allEvents)
      }
      catch{
        console.log('erro')
      }
    }
    loadEvents();
  }, [sport])

    return (
      <SafeAreaView>
        <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
        <ScrollView style={styles.scrollV}>
            { events.length === 0 
              ? <Text> Sem eventos Disponiveis </Text>

              :

              events.map((event, index) => (
               id != event.creator &&
               (
                <View  key={events._id} style={styles.card}> 
                <View style={styles.cardTitleView}>
                  <Image style={styles.cardSportIcon} />
                  <Text style={styles.cardTitle}>{event.name}</Text>
                </View>
                <View style={styles.cardContent}>
                  <View  style={styles.cardData}>
                      <Text style={styles.cardDataMes}>OUT</Text>
                      <Text style={styles.cardDataDia}>05</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardLocalText}>{event.local}</Text>
                    <View  style={styles.cardVagasView}>
                      <Text style={styles.cardVagasN}>{event.seats}</Text>
                      <Text style={styles.carVagasV}>Vagas Abertas</Text>
                      <Text style={styles.carVagasH}>19h00 - 22h00</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardDescView}>
                      <Text style={styles.cardDescText}> {event.desc} </Text>
                </View>
                <View style={styles.cardPlay}>
                  <TouchableOpacity  style={styles.playButton}>
                    <Text style={styles.playButtonText} onPress={() => Alert.alert(
                        'Participar',
                        'Deseja participar desse evento?',
                          [
                           {text: 'Não', onPress: () => console.log('Cancel Pressed!')},
                           {text: 'Sim', onPress: this.handleEventSubscribe},
                         ],
                           { cancelable: false }
                          )}>Participar!
                    </Text>
                  </TouchableOpacity>
                </View>
                </View>
              ))
            )
            }
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  scrollV: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  cardTitleView:{
    flexDirection:'row',
    paddingHorizontal: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:  'flex-start',
  },
  cardTitle:{
    color: txt_color_cardTitle,
    flex:1,
    fontSize: 16,
    fontWeight: '800',
  },
  cardDescView:{
    fontStyle: 'italic',
    paddingHorizontal:8,
    paddingBottom: 8,
    paddingTop:4,
    textAlign: 'center',
    borderTopWidth:2,
    borderTopColor:'#ddd'
  },
  cardDescText:{
    fontStyle: 'italic',
    fontSize:14,
    textAlign: 'center',
    fontWeight: '400',
  },
  cardVagasView:{
    marginTop: 8,
    marginLeft: 8,
    flexDirection:'row', 
    backgroundColor: bg_color_cardHora,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#000',
    alignSelf:  'flex-start',
    textAlign: 'center',
    fontWeight: '700',
  },
  cardVagasN:{
    fontSize:16,
    fontWeight: '900',
    marginRight: 4,
    color: txt_color_vagas_dsp
  },
  carVagasV:{
    fontWeight: '500',
    marginRight: 12,
    color: txt_color_vagas_dsp,
    fontSize:12,
  },
  carVagasH:{
    fontSize:12,
    fontWeight: '500',
    color: txt_color_light,
  },
  cardInfo:{
    alignSelf:  'flex-start',
    flex:1,
  },
  cardLocalText:{
    marginHorizontal: 10,
    fontSize: 14,
  },
  cardContent:{
    marginVertical: 10,
    flexDirection: 'row',
  },
  cardData:{
    backgroundColor: bg_color_cardData,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf:  'flex-start',
    marginHorizontal:8,
    textAlign: 'center',
    fontWeight: '700',
  },
  cardDataMes:{
    fontSize:13,
    textAlign: 'center',
    fontWeight: '500',
    color: txt_color_light,
  },
  cardDataDia:{
    fontSize:16,
    textAlign: 'center',
    fontWeight: '500',
    color: txt_color_bright,
  },
  playButtonText:{
    color:'#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '800',
  },
  playButton:{
    paddingVertical: 4,
    textAlign: 'center',
  },
  cardPlay:{
    width: '100%',
    paddingVertical: 8,
    backgroundColor: bg_color_play,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardSportIcon:{
    width:22,
    height:22,
    marginHorizontal:10,
    marginVertical:10,
  },
  card:{
    flexDirection:'column',
    marginTop: 16,
    marginHorizontal: 2,
    shadowRadius: 1,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: bg_color_card,
    shadowOffset:{
      width: 3,
      height: 3,
    },
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
