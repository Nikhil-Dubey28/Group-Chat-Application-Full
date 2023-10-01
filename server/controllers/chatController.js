const Chat = require('../models/Chat')
const UserGroup = require('../models/UserGroup')

const Group = require('../models/Group')
const User = require('../models/User')
const AWS = require('aws-sdk')
const multer = require('multer')

const sendMessage = async (req,res) => {
    try {   
        const {chatId, message,email} = req.body
        const {groupId} = req.params
        

        const userInGroup = await UserGroup.findOne({
            where:{
                userId : req.userId,
                groupId: groupId
            }
        })

        if(!userInGroup) {
           return res.status(401).json({message: "you can no longer send messages in this group"})
        }
     const chat =  await Chat.create( {
            name: req.userName,
            userId : req.userId,
            message: message,
            email: email,
            groupId: chatId
            
        })
        res.status(200).json({message: 'success', chat})

    }catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
}




const getMessage = async(req,res) => {
    try {
            const chatId = req.params.chatId
            const messages = await Chat.findAll({
                where : {
                    groupId: chatId
                }
            })
            res.status(200).json(messages)
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}


const s3 = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });




const uploadToS3 = async (file,originalFileName)  => {
    let contentType = 'application/octet-stream';  

   
    if (originalFileName.endsWith('.jpg') || originalFileName.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (originalFileName.endsWith('.png')) {
      contentType = 'image/png';
    } else if (originalFileName.endsWith('.mp4')) {
      contentType = 'video/mp4';
    } else if (originalFileName.endsWith('.wav')) {
      contentType = 'audio/wav';
    }


const params = { 
    Bucket: process.env.BUCKET_NAME,
    Key: `${originalFileName}`,
    Body: file.buffer,
    ContentType: contentType,
    ContentDisposition: 'inline'
}

try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
}catch(err) {
    console.log(err)
}
}

const upload = async(req,res) => {
    try{
        const file = req.file
        console.log(file)
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
          }

          
    // Get the original file name
    const originalFileName = file.originalname;

    // Upload the file to S3
    const fileLink = await uploadToS3(file,originalFileName);

    res.status(200).json({ fileLink, originalFileName });
    }catch(err) {
console.log(err)
    }
}


module.exports = {
    sendMessage,
    getMessage,
    uploadToS3,
    upload
}
