/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {AsyncStorage} from 'react-native';

class Authentication extends Component {
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

// Para funcionamento, é necessário que o login retorne um token (pode ser o id criado pelo Mongo)
// userLogin() {
//     if (!this.state.username || !this.state.password) return;
//     fetch('http://192.168.XXX.XXX:3001/sessions/create', {
//         method: 'POST',
//         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             username: this.state.username,
//             password: this.state.password,
//         })
//     })
//     .then((response) => response.json())
//     .then((responseData) => {
//         this.saveItem('id_token', responseData.id_token),
//         Alert.alert('Login Success!'),
//         Actions.HomePage();
//     })
//     .done();
// }
}

export default Authentication;
