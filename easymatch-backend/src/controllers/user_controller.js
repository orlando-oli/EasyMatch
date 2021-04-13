const users = require('../models/users');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

module.exports = {
  async addUser(request, response) {
    const {email} = request.body;

    const userExist = await users.findOne({email: email});

    if (userExist) {
      console.log('current email already used!');
      return response.status(400).json({error: 'current email already used!'});
    }

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      console.log(errors.errors.forEach((e) => console.log(e.msg)));
      return response.json(errors.errors);
    }

    const {name, birthdate, password, sports} = request.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await users.create({
      name: name,
      birthdate: birthdate,
      password: hash,
      email: email,
      sports: sports,
    });
    console.log('new user added');
    return response.json(user);
  },

  async readUser(request, response) {
    console.log('entrei');
    const {email, password} = request.body;
    const userData = await users.findOne({email: email});

    if (userData) {
      const {password: hash} = userData;
      const validation = await bcrypt.compareSync(password, hash);

      if (validation) {
        return response.json(userData);
      } else {
        return response.status(400).json({error: 'invalid password'});
      }
    } else {
      console.log('user do not exist');
      return response.status(400).json({error: 'user do not exist'});
    }
  },

  async readUserById(request, response) {
    const {id} = request.body;
    const userData = await users.findById(id);
    if (userData) {
      return response.json(userData);
    } else {
      console.log('user do not exist');
      return response.status(400).json({error: 'user do not exist'});
    }
  },

  async updateUser(request, response) {
    const {email, password, newName, newBirthdate, newEmail, newPassword} = request.body;
    const errors = validationResult(request);

    const userData = await users.findOne({email: email});

    if (userData) {
      const {email: oldEmail, name: oldName, birthdate: oldBirthdate, password: userHash} = userData;

      const validation = await bcrypt.compareSync(password, userHash);

      const userExist = await users.findOne({email: newEmail});

      if (userExist && newEmail != oldEmail) {
        console.log('current email already used!');
        return response.status(400).json({error: 'current email already used!'});
      }

      if (validation) {
        if (!errors.isEmpty() && (newEmail != '' || newName != '' || newPassword != '')) {
          console.log(errors.errors.forEach((e) => console.log(e.msg)));
          return response.json(errors.errors);
        }

        const salt = bcrypt.genSaltSync(10);
        const newHash = bcrypt.hashSync(newPassword, salt);

        const newData = await users.update(userExist, {
          email: newEmail || oldEmail,
          name: newName || oldName,
          birthdate: newBirthdate || oldBirthdate,
          password: newHash || userHash,
        });

        console.log('user updated');
        return response.json(newData);
      } else {
        console.log('incorrect password');
        return response.status(400).json({error: 'incorrect password'});
      }
    } else {
      console.log('user do not exist');
      return response.status(400).json({error: 'user do not exist'});
    }
  },

  async addSportOnUser(request, response) {
    const {id, futebol, corrida, basquete, volei, natacao} = request.body;
    const choosedSports = [];

    if (futebol) choosedSports.push('futebol');
    if (corrida) choosedSports.push('corrida');
    if (basquete) choosedSports.push('basquete');
    if (volei) choosedSports.push('futebol');
    if (natacao) choosedSports.push('natacao');

    const userData = await users.findByIdAndUpdate(id, {sports: choosedSports});
    console.log(choosedSports);
    console.log(userData);
    return response.json(userData);
  },

  async deleteUser(request, response) {
    const {email, password} = request.body;
    const userData = await users.findOne({email: email});

    if (userData) {
      const {password: hash} = userData;
      const validation = await bcrypt.compareSync(password, hash);

      if (validation) {
        const deleteUser = await users.deleteOne({email: email});
        console.log('user deleted');
        return response.json(deleteUser);
      } else {
        console.log('incorrect password');
        return response.status(400).json({error: 'incorrect password'});
      }
    } else {
      console.log('user do not exist');
      return response.status(400).json({error: 'user do not exist'});
    }
  },
};
