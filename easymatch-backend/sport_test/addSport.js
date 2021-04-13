/* eslint-disable require-jsdoc */

const api = require('../cli_test/api');
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

async function addSport() {
  const name = await ask('Qual esporte deseja adicionar?');
  const group = await ask('A modalidade pode ser praticada em grupo?');
  const local = await ask('Onde o esporte pode ser praticado?');

  r1.close();
  try {
    const response = await api.put('/sports', {
      name: name,
      group: group,
      local: local,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
  return null;
}

addSport();
