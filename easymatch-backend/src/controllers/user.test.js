const server = require('../server')

describe('inicio dos testes', () => {
  test('Should return user error for no user', async done => {
    const response = await request(server).put('/user', {
      email: "teste@teste.com",
      password: "senhaerrada",
    });
      expect(response.status).toEqual(400);
      done();
  })
})