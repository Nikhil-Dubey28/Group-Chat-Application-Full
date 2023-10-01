const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secretKey = process.env.TOKEN_SECRET_KEY
const { Op } = require("sequelize");

function generateAccessToken() {

}

//signup
const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists' })
            return
        }

        const user = await User.create({ name, email, phone, password: hashedPass, })
        res.status(201).json(user)
    } catch (err) {
        console.error(err.message)
        console.error(err.stack)
        res.status(500).json({ message: 'internal server error' })
    }
}

//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userDetails = await User.findOne({ where: { email } })

        if (!userDetails) {
            res.status(404).json({ message: 'wrong email' })
        } else {
            const correctPass = await bcrypt.compare(password, userDetails.password)
            if (correctPass) {
                const token = jwt.sign({ userId: userDetails.id, userName: userDetails.name, userEmail: userDetails.email }, secretKey)
                req.headers.authorization = token


                const user = {
                    id: userDetails.id,
                    name: userDetails.name,
                    email: userDetails.email,
                    phone: userDetails.phone

                }
                res.status(200).json({ message: 'user login successful', user, token, })
            } else {
                res.status(401).json({ message: 'wrong password' })
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
}

const fetchUsers = async (req, res) => {
    try {
        const loggedInUserId = req.userId // Assuming the logged-in user's ID is in req.user.userId
        const users = await User.findAll({
            where: {
                id: { [Op.ne]: loggedInUserId } // Exclude the logged-in user's ID
            }
        });
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        console.error(err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// const fetchUsers = async (req, res) => {
//     try {

//         const users = await User.findAll();
//         res.status(200).json(users);
//     } catch (err) {
//         console.error(err.message);
//         console.error(err.stack);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }




module.exports = {
    signup,
    login,
    fetchUsers
}





