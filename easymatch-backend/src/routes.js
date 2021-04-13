const express = require('express');
const {check} = require('express-validator');
const userController = require('./controllers/user_controller');
const sportController = require('./controllers/sport_controller');
const eventController = require('./controllers/event_controller');

const routes = new express.Router();

routes.put('/users', [
  check('email', 'invalid email').isEmail(),
  check('name', 'invalid name').isLength({min: 2}),
  check('password', 'invalid password').isLength({min: 4, max: 12})
], userController.addUser);

routes.put('/sports', sportController.addSport);

routes.put('/user', userController.readUser);
routes.put('/userId', userController.readUserById);
routes.post('/user/sport', userController.addSportOnUser);
routes.post('/user/update', [
  check('newEmail', 'invalid email').isEmail(),
  check('newName', 'invalid name').isLength({min: 2}),
  check('newPassword', 'invalid password').isLength({min: 4, max: 12})
], userController.updateUser);

routes.delete('/user/delete', userController.deleteUser);

routes.put('/events', eventController.addEvent);
routes.put('/events/all', eventController.readAllEvents);
routes.put('/events/bysport', eventController.readAllEventsBySport);
routes.put('/events/search/:id', eventController.readEvent);
routes.put('/events/update', eventController.updateEvent);
routes.put('/events/update/add', eventController.addPersonOnEvent);
routes.put('/events/update/remove', eventController.removePersonOfEvent);
routes.put('/events/delete', eventController.deleteEvent);
routes.put('/events/easymatch', eventController.easyMatch);


module.exports = routes;
