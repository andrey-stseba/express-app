const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const messagesDb = [
  {
    id: uuidv4(),
    text: 'Hello Ben',
    email: 'ben@gmail.com',
    timeValue: format(new Date(2020, 10, 1), 'MM.dd.yyyy')
  },
  {
    id: uuidv4(),
    text: 'Ben i need help',
    email: 'test@gmail.com.ua',
    timeValue: format(new Date(2020, 4, 22), 'MM.dd.yyyy')
  }
];

class Message {
  static messages = messagesDb;

  static getMessages = () => Message.messages;

  static createMessage = data => {
    const newMessage = { ...data, id: uuidv4() };
    Message.messages.push(newMessage);

    return newMessage;
  };

  static getMessageById = mesId => {
    const [messageById] = Message.messages.filter(m => m.id === mesId);
    return messageById;
  };

  static deleteMessage = mesId => {
    const deletedMessagesIndex = Message.messages.findIndex(
      msg => msg.id === mesId
    );

    return deletedMessagesIndex !== -1
      ? Message.messages.splice(deletedMessagesIndex, 1)[0]
      : null;
  };
}

module.exports = Message;
