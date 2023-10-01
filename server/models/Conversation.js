const sequelize = require('../database/configDatabase')
const Sequelize = require('sequelize')


const Conversation = sequelize.define('conversation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // autoIncrement: true,
       
    },
    groupName: {
        type: Sequelize.STRING
    }

    
})

module.exports = Conversation