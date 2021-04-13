/* eslint-disable no-undef */
/* eslint-disable max-len */
const events = require('../models/events');
const users = require('../models/users');
const sports = require('../models/sports');
const {validationResult} = require('express-validator');
const randomstring = require('randomstring');

module.exports = {
  async addEvent(request, response) {
    // eslint-disable-next-line max-len
    const {
      name,
      local,
      datetime,
      desc,
      seats,
      isPrivate,
      creator,
      sport,
    } = request.body;

    const creatorExist = await users.findOne({name: creator});
    if (!creatorExist) {
      console.log('User does not exist');
      return response.status(400).json({error: 'User does not exist'});
    }

    const sportExist = await sports.findOne({name: sport});
    if (!sportExist) {
      console.log('Sport does not exist');
      return response.status(400).json({error: 'sport does not exist'});
    }

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log(errors.errors.forEach((e) => console.log(e.msg)));
      return response.json(errors.errors);
    }

    let key;

    if (isPrivate === true) {
      key = randomstring.generate(6);
    } else {
      key = null;
    }

    const event = await events.create({
      name: name,
      local: local,
      datetime: datetime,
      desc: desc,
      seats: seats,
      isPrivate: isPrivate,
      key: key,
      creator: creatorExist._id,
      sport: sportExist._id,
    });
    await events.updateOne(
        event,
        {$push: {users: creator}},
        {useFindAndModify: false}
    );
    console.log('New event added');
    return response.json(event);
  },

  async readAllEvents(request, response) {
    const ev = await events.find();
    console.log(ev);
    return response.json(ev);
  },

  async readEvent(request, response) {
    const {id} = request.params;
    const eventData = await events.findById(id);

    if (!eventData) {
      console.log('Event does not exist');
      return response.status(400).json({error: 'Event does not exist'});
    }

    return response.json(eventData);
  },

  async updateEvent(request, response) {
    // eslint-disable-next-line max-len
    const {
      id,
      name,
      local,
      datetime,
      desc,
      seats,
      isPrivate,
      creator,
      sport,
    } = request.body;

    const creatorExist = await users.findById(creator);
    if (!creatorExist) {
      console.log('User does not exist');
      return response.status(400).json({error: 'User does not exist'});
    }

    const sportExist = await sports.findById(sport);
    if (!sportExist) {
      console.log('Sport does not exist');
      return response.status(400).json({error: 'sport does not exist'});
    }

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log(errors.errors.forEach((e) => console.log(e.msg)));
      return response.json(errors.errors);
    }

    const eventData = await events.findById(id);
    if (!eventData) {
      console.log('Event does not exist');
      return response.status(400).json({error: 'Event does not exist'});
    } else {
      let key;
      if (isPrivate === true) {
        key = randomstring.generate(6);
      } else {
        key = null;
      }

      const updatedEvent = await events.updateOne(
          eventData,
          {
            name: name || eventData.name,
            local: local || eventData.local,
            datetime: datetime || eventData.datetime,
            desc: desc || eventData.desc,
            seats: seats || eventData.seats,
            isPrivate: isPrivate || eventData.isPrivate,
            key: key || eventData.key,
            creator: creator,
            sport: sport || eventData.sport,
          },
          {useFindAndModify: false}
      );
      console.log('Event updated');
      return response.json(updatedEvent);
    }
  },

  async addPersonOnEvent(request, response) {
    const {eventID, userId} = request.body;

    const eventExist = await events.findById(eventID);

    if (eventExist) {
      if (eventExist.users.length < eventExist.seats) {
        const addPerson = await events.updateOne(
            eventExist,
            {$push: {users: userId}},
            {useFindAndModify: false}
        );
        console.log('person added');
        return response.json(addPerson);
      } else {
        console.log('Max number of users');
        return response.status(400).json({error: 'Max number of users'});
      }
    } else {
      console.log('event does not exist');
      return response.status(400).json({error: 'Event does not exist'});
    }
  },

  async readAllEventsBySport(request, response) {
    const {sport} = request.body;
    console.log(sport);
    const ev = await events.find({sport: sport});
    console.log(ev);
    return response.json(ev);
  },

  async removePersonOfEvent(request, response) {
    const {eventID, userEmail} = request.body;

    const eventExist = await events.findById(eventID);

    if (eventExist) {
      const addPerson = await events.updateOne(
          eventExist,
          {$pull: {users: userEmail}},
          {useFindAndModify: false}
      );
      console.log('person removed');
      return response.json(addPerson);
    } else {
      console.log('event does not exist');
      return response.status(400).json({error: 'Event does not exist'});
    }
  },

  async deleteEvent(request, response) {
    const {eventID, creator, userId} = request.body;

    const creatorExist = await users.findById(creator);
    if (!creatorExist) {
      console.log('Creator does not exist');
      return response.status(400).json({error: 'Creator does not exist'});
    }

    const userExist = await users.findById(userId);
    if (!userExist) {
      console.log('User does not exist');
      return response.status(400).json({error: 'User does not exist'});
    }

    if (creator === userId) {
      const eventExist = await events.findById(eventID);
      if (!eventExist) {
        console.log('Event does not exist');
        return response.status(400).json({error: 'Event does not exist'});
      } else {
        eventExist.users.forEach((element) => {
          users.findByIdAndUpdate(
              element,
              {$pull: {events: eventID}},
              {useFindAndModify: false}
          );
        });
        const deleteEvent = await events.delete(eventExist);
        console.log('Event deleted');
        return response.json(deleteEvent);
      }
    } else {
      console.log('Different user and creator');
      return response.status(400).json({error: 'Different user and creator'});
    }
  },

  async easyMatch(request, response) {
    const {userId} = request.body;

    const user = await users.findById(userId);

    if (user.sports.length == 0) {
      return response.status(400).json({error: 'no suggestions available'});
    }

    for (let i = 0; i < user.sports.length; i++) {
      const sportName = user.sports[i];
      const sport = await sports.findOne({name: sportName});
      const event = await events.findOne({sport: sport._id});
      if (event && !event.isPrivate) {
        return response.json(event);
      }
    }
    return response.status(400).json({error: 'no events available'});
  },
};
