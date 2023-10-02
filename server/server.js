const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./database/configDatabase')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const groupRoutes = require ('./routes/groupRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const Chat = require('./models/Chat')
const User = require('./models/User')
const Group = require('./models/Group')
const UserGroup = require('./models/UserGroup')
const Conversation = require('./models/Conversation')


// middlewares

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



//routes
app.use('/api',userRoutes)
app.use('/api',chatRoutes)
app.use('/api',groupRoutes)
app.use('/api',conversationRoutes)


// relations
User.hasMany(Chat, { onDelete: "CASCADE", hooks: true } );
User.hasMany(Conversation)

Conversation.belongsTo(User)

Chat.belongsTo(User);
Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`)
})

const io = require('socket.io')(server,{
    pingTimeout : 60000,
    cors: {
        origin: "*",
    }
});

io.on("connection",(socket) => {
console.log('connected to socket.io');

socket.on('setup', (userData) => {
socket.join(userData)
console.log(userData)
socket.emit("connected")
})

socket.on("join chat",(room) => {
socket.join(room)
console.log("User joined room: " + room)
})

socket.on("new message", (newMessageReceived) => {
    const  {message,chatId,name,email} = newMessageReceived;

    socket.broadcast.to(chatId).emit("message received", {
        message,
        name,
        email
    })
})

socket.off("setup",() => {
    conosole.log('USER DISCONNECTED')
    socket.leave(userData)
})
})


const job = require("./jobs/cron");
job.start();

sequelize
.sync()
.then(() => {
    console.log('connected to database')
   
})

