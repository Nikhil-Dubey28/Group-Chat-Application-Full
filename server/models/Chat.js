const sequelize = require('../database/configDatabase')
const Sequelize = require('sequelize')


const Chat = sequelize.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type : Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING 
    },
})

module.exports = Chat

// const { DataTypes } = require('sequelize');
// const sequelize = new Sequelize(/* connection */);

// const Chat = sequelize.define('Chat', {
//   chatName: {
//     type: DataTypes.STRING
//   },
//   isGroupChat: {
//     type: DataTypes.BOOLEAN
//   },
//   latestMessageId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Messages',
//       key: 'id'
//     }
//   },
//   groupAdminId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Users',
//       key: 'id'
//     }
//   }
// }, {
//   timestamps: true
// });

// Chat.belongsToMany(User, { through: 'ChatUsers' });

// module.exports = Chat;
