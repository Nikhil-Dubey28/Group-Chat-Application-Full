const router = require('express').Router()
const conversationController = require('../controllers/conversationController')
const auth = require('../middleware/auth')

router.post('/conversation/add-conversation/:groupId',auth,conversationController.addConversation)
router.get('/conversation/get-conversation/',auth,conversationController.getConversation)
router.get('/conversation/get-conversation-by-id/:groupId/:userId',auth,conversationController.getConversationById)
router.post('/conversation/add-conversation-for-members/:groupId',auth,conversationController.addConversationForMembers)
router.delete('/conversation/delete-conversation/:groupId/:groupName',auth,conversationController.deleteConversation)



module.exports = router