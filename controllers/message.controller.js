const Message = require('./../models/message');

module.exports.getMessages = (req, res) => {
  const foundMessages = Message.getMessages();
  res.status(200).send(foundMessages);
};

module.exports.getMessageById = (req, res) => {
  const {
    params: { mesId }
  } = req;
  const foundMessage = Message.getMessageById(mesId);
  if (foundMessage) {
    return res.status(200).send(foundMessage);
  }
  res.status(404).send('Message not found');
};

module.exports.createMessage = (req, res) => {
  const { body } = req;
  const createdMessage = Message.createMessage(body);
  res.status(201).send(createdMessage);
};

module.exports.deleteMessageById = (req, res) => {
  const {
    params: { mesId }
  } = req;

  const deletedMessages = Message.deleteMessage(mesId);
  if (deletedMessages) {
    return res.status(200).send(deletedMessages);
  }
  res.status(404).send('Message not found');
};
