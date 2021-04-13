import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


export default function drawerContentComponents({navigation}){  
    
    async function handleMain(){
        navigation.navigate('Main')
    }

    async function handleUserPage(){
        navigation.navigate('UserPage')
    }

    async function handleFeedPage(){
        navigation.navigate('Feed')
    }

    async function handleCreateEvent(){
        navigation.navigate('CreateEventScreen')
    }

    async function handleMyEvents(){
        navigation.navigate('MyEventsScreen')
    }

    handleLogOut = () => {
        AsyncStorage.clear()
        navigation.navigate('Login')
    }


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.imgSection} onPress={handleUserPage}>
                <Image
                    style={styles.image}
                    source={require('../../assets/silhueta.jpg')}
                />
                </TouchableOpacity>
                <Text style={styles.txt}>Perfil</Text>
            </View>

            <View style={styles.screenSection}>
                <TouchableOpacity style={styles.screen} onPress={handleMain}><Text style={styles.buttonTxt}>Página Principal</Text></TouchableOpacity>
                <TouchableOpacity style={styles.screen} onPress={handleFeedPage}><Text style={styles.buttonTxt}>Feed</Text></TouchableOpacity>
                <TouchableOpacity style={styles.screen} onPress={handleCreateEvent}><Text style={styles.buttonTxt}>Criar evento</Text></TouchableOpacity>
                <TouchableOpacity style={styles.screen} onPress={handleMyEvents}><Text style={styles.buttonTxt}>Meus Eventos</Text></TouchableOpacity>
            </View>

            <View style={styles.Footer}>
                <TouchableOpacity
                    style={styles.logOutBtn}
                    onPress={() => Alert.alert(
                      'Log Out',
                      'Deseja sair?',
                      [
                        {text: 'Não', onPress: () => console.log('Cancel Pressed!')},
                        {text: 'Sim', onPress: this.handleLogOut},
                      ],
                      { cancelable: false }
                    )}
                >
                <Text style = {styles.txtLogOut}>LOG OUT</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        marginTop: 5,
        height: 150,
        alignItems: 'center',
    },
    imgSection:{
        height: 100,
        width: 100,
        borderRadius: 200,
        backgroundColor: '#f5f5f5',
        borderWidth: 3,
        borderColor: 'rgba(74,0,115, 0.8)',
        overflow: 'hidden'
    },
    image: {
        height: 100,
        width: 100,
        bottom: 3,
    },  
    screenSection:{
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonTxt: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
    },
    Footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: 40,
        width: 80,
    },
    logOutBtn: {
        backgroundColor: 'rgba(74,0,115, 0.8)',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 30,
        width: '100%',
        bottom: 0,
    },
    txtLogOut : {
        fontWeight: 'bold',
        color: '#fff'
    },
    screen : {
        marginVertical: 4,
        borderBottomWidth : 1,
        borderColor: 'rgba(74,0,115, 0.8)',
        fontSize: 20,
    }
})