const express = require('express');
const app = express();

const messageController = require('./controllers/message.controller');
const validate = require('./middleware/validate.mw');

app.use(express.json());

app.post(
  '/messages',
  validate.parseDate,
  validate.validateMessage,
  validate.formatDate,
  messageController.createMessage
);

app.get('/messages', messageController.getMessages);

app.get('/messages/:mesId', messageController.getMessageById);

app.delete('/messages/:mesId', messageController.deleteMessageById);

module.exports = app;
