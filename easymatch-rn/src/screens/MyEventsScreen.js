/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {Text, View, Button, SafeAreaView, ScrollView} from 'react-native';
import api from '../services/api';

export default function MyEventsScreen({navigation}) {
  const [events, setEvents] = useState([]);
  const [userEvents, updateEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const id = navigation.getParam('user');

  async function fetchEvents() {
    const eventsResponse = await api.put('/events/all');
    setEvents(Array.from(eventsResponse.data));
    setLoaded(true);
    console.log('asdasdasdasdasd');
  }
  useEffect(() => {
    if (!loaded) fetchEvents();
  }, [loaded]);

  async function handleDelete(i, event) {
    updateEvents(events.splice(i, 1));
    const eventsResponse = await api.put('/events/delete', {
      userId: id,
      eventID: event._id,
      creator: id,
    });
    setLoaded(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {events &&
          events.map((event, index) => {
            console.log(event._id);
            if (event.creator == id) {
              return (
                <View key={index}>
                  <Button
                    key={index}
                    title="X"
                    onPress={async () =>
                      await handleDelete(index, event)
                    }></Button>
                  <Text key={index}>
                    {!userEvents[index] ? event.name : ''}
                  </Text>
                </View>
              );
            }
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
