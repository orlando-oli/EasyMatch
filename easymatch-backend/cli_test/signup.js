/* eslint-disable require-jsdoc */
const api = require('./api');
const readline = require('readline');
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    r1.question(question, (answer) => resolve(answer));
  });
}

async function signup() {
  const email = await ask('qual é o seu email?');
  const password = await ask('que senha voce deseja usar?');
  const name = await ask('qual é o seu nome?');
  const age = await ask('Entre com sua data de nascimento (YYY-MM-DD)');

  const fut = await ask('Futebol?');
  const basca = await ask('Basquete?');
  const corrida = await ask('Corrida?');
  const natacao = await ask('Natacao?');
  const volei = await ask('volei?');

  console.log(natacao);
  const sports = [];
  if (fut == 'true') {
    sports.push('futebol');
  }

  if (basca == 'true') {
    sports.push('basquete');
  }

  if (corrida == 'true') {
    sports.push('corrida');
  }

  if (natacao == 'true') {
    sports.push('natacao');
  }

  if (volei == 'true') {
    sports.push('volei');
  }

  r1.close();
  try {
    const response = await api.put('/users', {
      email: email,
      password: password,
      name: name,
      age: new Date(age),
      sports: sports,
    });

    return response;
  } catch (e) {
    console.log(e);
  }

  return null;
}

signup();
