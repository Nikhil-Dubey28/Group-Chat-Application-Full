const router = require('express').Router()
const groupController = require('../controllers/groupController')
const auth = require('../middleware/auth')

router.put('/group/make-admin/:groupId',auth,groupController.makeAdmin)
router.delete('/group/remove-from-group/:groupId',auth,groupController.removeFromGroup)
router.delete('/group/leave-group/:groupId',auth,groupController.leaveGroup)
router.post('/group/create-group',auth,groupController.createGroup)
router.post('/group/add-to-group/:groupId', auth,groupController.addToGroup)
router.get('/group/fetch-groups',auth,groupController.fetchUserGroups)
router.get('/group/fetch-users-to-add/:groupId',auth,groupController.fetchUsersToAdd)
router.get('/group/fetch-users-to-remove/:groupId',auth,groupController.fetchUsersToRemove)
router.get('/group/view-members/:groupId',auth,groupController.viewMembers)
router.get('/group/fetch-users-to-make-admin/:groupId',auth,groupController.fetchUsersToMakeAdmin)
router.get('/group/fetch-group-by-id/:groupId',auth,groupController.fetchGroupById)

module.exports = router