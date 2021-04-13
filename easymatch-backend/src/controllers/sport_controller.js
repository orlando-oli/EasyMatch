const sports = require('../models/sports');
const {validationResult} = require('express-validator');

module.exports = {
  async addSport(request, response) {
    const {name} = request.body;
    const sportExist = await sports.findOne({name: name});
    if (sportExist) {
      console.log('Current sport already added!');
      return response.status(400).json({error: 'Current sport already added!'});
    }
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      console.log(errors.errors.forEach((e) => console.log(e.msg)));
      return response.json(errors.errors);
    }
    const {group, local} = request.body;
    const sport = await sports.create({
      name: name,
      group: group,
      local: local,
    });
    console.log('New sport added');
    return response.json(sport);
  },
  async readSport(request, response) {
    const {name} = request.params;
    const sportExist= await sports.findOne({name: name});

    if (sportExist) {
      const targetSport = await sports.find({name: name});
      console.log(targetSport);
      return response.json(targetSport);
    } else {
      console.log('user do not exist');
      return response.status(400).json({error: 'user do not exist'});
    }
  },
};
