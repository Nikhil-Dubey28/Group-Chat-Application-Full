const sequelize = require('../database/configDatabase')
const Sequelize = require('sequelize')

const Message = sequelize.define('Message', {
  senderId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  receiverId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  chatId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Chats',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = Message;


