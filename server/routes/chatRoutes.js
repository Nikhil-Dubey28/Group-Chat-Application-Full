const router = require('express').Router()
const chatController = require('../controllers/chatController')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

const {uploadToS3} = chatController.uploadToS3



router.post('/chat/upload',auth,upload.single('file'),chatController.upload)
router.post('/chat/send-message/:groupId',auth,chatController.sendMessage)
router.get('/chat/get-message/:chatId',auth,chatController.getMessage)



module.exports = router