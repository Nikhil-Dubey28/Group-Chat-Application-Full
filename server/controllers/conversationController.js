const Conversation = require('../models/Conversation')
const UserGroup = require('../models/UserGroup')
const { Op } = require("sequelize");

const addConversation = async (req,res) => {
    try {
        
        const {groupId} = req.params 
    
        const groupName = req.body.groupName

        const conversationExists = await Conversation.findOne({
            where : {
                userId: req.userId,
                groupId: groupId

            }
        })

        if(conversationExists) {
            return res.status(401).json({message:"conversation already added"})
        }
    
        const conversations  = await Conversation.create({
            groupId: groupId,
            groupName: groupName,
            userId: req.userId
        })

        res.status(201).json(conversations)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

const addConversationForMembers = async (req, res) => {
    try {
      const { groupId } = req.params;
      const groupName = req.body.groupName;
      const currentUser = req.userId;
  
      // find all members of the group excluding the current user
      const membersOfTheGroup = await UserGroup.findAll({
        where: {
          groupId,
          userId: { [Op.ne]: currentUser } // exclude the current user
        }
      });
  
      // Get the userIds of the members
      const userIds = membersOfTheGroup.map(member => member.userId);
  
      // Create conversations for each member
      await Promise.all(
        userIds.map(async userId => {
          await Conversation.create({
            groupId,
            groupName,
            userId
          });
        })
      );
  
      res.status(201).json({ message: 'Conversations created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
const getConversation = async (req,res) => {
    try {
        const userId = req.userId

        const conversations = await Conversation.findAll({
            where:{
                userId: userId
            }
        })
        res.status(201).json(conversations)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

const getConversationById = async (req, res) => {
    try {
      const { groupId, userId } = req.params;
  
      const conversation = await Conversation.findOne({
        where: {
          groupId: groupId,
          userId: userId
        }
      });
  
      res.status(200).json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const deleteConversation = async(req,res) => {
    try {
        const {groupId,groupName} = req.params
        

        const deletedConversation = await Conversation.destroy({
            where :{
                userId: req.userId,
                groupId: groupId,
                groupName: groupName
            }
        })
        res.status(200).json(deletedConversation)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }
module.exports = {
    addConversation,
    getConversation,
    getConversationById,
    addConversationForMembers,
    deleteConversation
}