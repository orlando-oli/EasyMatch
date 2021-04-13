import React, {useState} from 'react'
import {View, TouchableOpacity, Text, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage';


export default function UpdateInfo({navigation}){
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [email, setEmail] = useState('')

    async function handleUpdate() {
        const response = await api.post('/user/update', {
            oldEmail,
            oldPassword,
            userName,
            email,
            password,
        })
        const {_id} = response.data
        await AsyncStorage.setItem('user', _id)
        navigation.navigate('Main', {user: _id})
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerTxt}>Editar dados</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formTxtPass}>E-Mail Atual</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Digite seu e-mail atual"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={oldEmail}
                        onChangeText={(oldEmail) => setOldEmail(oldEmail)}
                    />
                <Text style={styles.formTxtPass}>Novo E-Mail</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Digite seu novo email"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                <Text style={styles.formTxtPass}>Senha Atual</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Digite sua senha atual"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={oldPassword}
                        onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                    />
                <Text style={styles.formTxtPass}>Novo Nome de Usuário</Text>
                <TextInput
                    autoCorrect={false}
                    placeholder="Digite seu novo nome de usuário"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={userName}
                    onChangeText={(userName) => setUserName(userName)}
                />
                <Text style={styles.formTxtPass}>Nova Senha</Text>
                <TextInput 
                    autoCorrect={false}
                    placeholder="Digite sua nova senha"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={password}
                    onChangeText={(password) => setPassWord(password)}
                />
            </View>

            <View style={styles.Btn}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleUpdate}>
                    <Text style={styles.confirmTxt}>SALVAR</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    header: {
        backgroundColor: 'rgba(74,0,115, 0.8)',
        height: 50,
        justifyContent: 'center',
    },
    headerTxt: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 28,
        marginLeft: 10,
    },
    form: {
        marginLeft: 10,
        marginTop: 10,
    },
    formTxt: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formTxtPass: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        padding: 15,
        height: 46,
        width: '95%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(74,0,115, 0.8)',
        borderRadius: 5,
    },
    Btn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: 40,
        width: 80,
    },
    confirmBtn: {
        backgroundColor: 'rgba(74,0,115, 0.8)',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 30,
        width: '100%',
        bottom: 0,
    },
    confirmTxt: {
        fontWeight: 'bold',
        color: '#fff'
    }
})