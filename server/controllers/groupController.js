// const User = require('../model/User');
const Group = require('../models/Group');
const UserGroup = require('../models/UserGroup');
const { Op } = require("sequelize");
const User = require('../models/User')
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/configDatabase')


const createGroup = async (req, res) => {

  try {
    const groupName = req.body.groupName;
    const admin = req.userName;
    const members = req.body.members;

    if(members.length == 0) {
      return res.status(404).json({message: "No members added"})
    }


    const group = await Group.create({
      name: groupName,
      admin: admin
    })

    // console.log(User)

    // const invitedMembers = await User.findAll({
    //     where: {
    //         email : {
    //             [Op.or] : members,
    //         },
    //     }
    // })

    const invitedMembers = await sequelize.query("SELECT * FROM Users WHERE email IN (:emails)",
      {
        replacements: { emails: members },
        type: QueryTypes.SELECT
      });


    (async () => {
      await Promise.all(
        invitedMembers.map(async (user) => {
          await UserGroup.create({
            isadmin: false,
            userId: user.id,
            groupId: group.id
          })
        })
      )
      await UserGroup.create({
        isadmin: true,
        userId: req.userId,
        groupId: group.dataValues.id
      })
    })()
    res.status(201).json({ group: group.dataValues.name, members: members })
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'internal server error' })
  }
}


const fetchUserGroups = async (req, res) => {
  const userId = req.userId

  try {
    const userGroups = await UserGroup.findAll({
      where: {
        UserId: userId
      }
    })

    const groupIds = userGroups.map(userGroup => userGroup.groupId)

    const groups = await Group.findAll({
      where: {
        id: groupIds
      }
    })
    res.status(200).json(groups)
    // console.log(groups)
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: 'internal server error' })
  }
}

const fetchUsersToAdd = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Fetch all users who are not part of the current group
    const usersNotInGroup = await User.findAll({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`
              (SELECT UserId 
                FROM UserGroups 
                WHERE GroupId = ${groupId}
              )`),
        },
      },
    });

    res.status(200).json(usersNotInGroup);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchUsersToRemove = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Fetch all users who are part of the current group
    const usersInGroup = await User.findAll({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`
            (SELECT UserId 
              FROM UserGroups 
              WHERE GroupId = ${groupId} AND isadmin = 1
            )`),
        },
      },
      include: [
        {
          model: UserGroup,
          where: {
            groupId: groupId,
            isadmin: 0 // Exclude admins
          },
          required: true
        }
      ]

    });

    res.status(200).json(usersInGroup);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const addToGroup = async (req, res) => {
  try {
    const { groupId } = req.params
    const members = req.body.members

    const group = await Group.findOne({
      where: {
        id: groupId


      }
    })
    if (group) {
      const admin = await UserGroup.findOne({
        where: {
          [Op.and]: [{ isadmin: 1 }, { groupId: groupId }],
        },
      })
      if (admin.userId === req.userId) {
        const invitedMembers = await sequelize.query("SELECT * FROM Users WHERE email IN (:emails)",
          {
            replacements: { emails: members },
            type: QueryTypes.SELECT
          });

        await Promise.all(
          invitedMembers.map(async (user) => {
            await UserGroup.create({
              isadmin: false,
              userId: user.id,
              groupId: group.id
            })
          })
        )
        res.status(201).json({ message: "members added successfully" })
      } else {
        res.status(401).json({ message: 'only admins can add members' })
      }
    }

    else {
      res.status(404).json({ message: "group doesnt exists" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const fetchGroupById = async (req, res) => {
  try {
    const { groupId } = req.params

    const group = await Group.findOne({
      where: {
        id: groupId
      }
    })

    res.status(200).json(group)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const removeFromGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const members = req.body.members;
    const userId = req.userId;

    const group = await Group.findOne({
      where: {
        id: groupId
      }
    });

    if (!group) {
      return res.status(404).json({ message: "Group doesn't exist" });
    }

    const userGroup = await UserGroup.findOne({
      where: {
        userId,
        groupId
      }
    });

    if (!userGroup) {
      return res.status(404).json({ message: "User not in the group" });
    }

    // Check if the requester is an admin
    const isAdmin = userGroup.isadmin;

    if (isAdmin) {
      // Get user IDs for the given emails
      const result = await sequelize.query(
        "SELECT id FROM Users WHERE email IN (:emails)",
        {
          replacements: { emails: members },
          type: QueryTypes.SELECT
        }
      );

      // Extract user IDs
      const userIds = result.map(user => user.id);

      // Remove the users from the group
      await UserGroup.destroy({
        where: {
          userId: userIds,
          groupId
        }
      });

      return res.status(201).json({ message: "Members removed successfully" });
    } else {
      return res.status(401).json({ message: 'Only admins can remove members' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}




const viewMembers = async (req, res) => {


  try {
    const { groupId } = req.params
    const group = await Group.findOne({ where: { name: groupId } });
    const userGroup = await UserGroup.findAll({
      where: { groupId: groupId },
    });

    const users = [];

    await Promise.all(
      userGroup.map(async (user) => {
        const res = await User.findOne({
          where: { id: user.userId },
        });
        users.push(res);
      })
    );
    res.status(200).json({ users: users, userGroup });
    // res.status(200).json( users ,userGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const fetchUsersToMakeAdmin = async (req, res) => {
  try {
    const { groupId } = req.params
    const usersToMakeAdmin = await UserGroup.findAll({
      where: {
        groupId,
        isadmin: false
      },

    })
    const userIdsToMakeAdmin = usersToMakeAdmin.map(user => user.userId)

    const users = await User.findAll({
      where: {
        id: userIdsToMakeAdmin
      }
    })
    res.status(200).json(users)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const makeAdmin = async (req, res) => {

  try {
    const { groupId } = req.params

    const members = req.body.members

    const group = await Group.findOne({
      where: {
        id: groupId
      }
    })


    if (!group) {
      res.status(404).json({ message: "Group doesn't exist" });
      return;
    }

    const admin = await UserGroup.findOne({
      where: {
        isadmin: true,
        groupId
      }
    })


    if (!admin || admin.userId !== req.userId) {
      res.status(401).json({ message: 'Only admins can make others admins' });
      return;
    }

    const users = await User.findAll({
      where: {
        email: members
      }
    })

    const userIds = users.map((user) => user.id)

    await UserGroup.update(
      { isadmin: true },
      {
        where: {
          groupId,
          userId: userIds
        }
      }
    )

    res.status(200).json({ message: "members updated to admins successfully" })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params
    const userId = req.userId

    const group = await Group.findOne({
      where: {
        id: groupId
      }
    })

    const userGroup = await UserGroup.findOne({
      where: {
        userId,
        groupId
      }
    })

    const isAdmin = userGroup.isadmin
    const otherAdminsExist = await UserGroup.findOne({
      where: {
        groupId,
        isadmin: true,
        userId: { [Op.ne]: userId }, // Excluding the current user
      }
    })


    if (isAdmin && !otherAdminsExist) {
      const nonAdmins = await UserGroup.findAll({
        where: {
          groupId,
          isadmin: false,
        },
      });

      if (nonAdmins.length > 0) {
        const randomNonAdmin = nonAdmins[Math.floor(Math.random() * nonAdmins.length)];

        await UserGroup.update(
          { isadmin: true },
          {
            where: {
              userId: randomNonAdmin.userId,
              groupId
            }
          }
        )
      } else {
        await Group.destroy({
          where: {
            id: groupId,
          },
        });
        return res.status(201).json({ message: "group deleted successfully" })
      }


    }

    await UserGroup.destroy({
      where: {
        userId,
        groupId
      }
    })

    return res.status(201).json({ message: "group left successfully" });



  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  createGroup,
  fetchUserGroups,
  fetchUsersToAdd,
  fetchUsersToRemove,
  addToGroup,
  removeFromGroup,
  viewMembers,
  fetchUsersToMakeAdmin,
  makeAdmin,
  leaveGroup,
  fetchGroupById
}

















