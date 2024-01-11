const UserDataBase = require('../database/schema/userSchema');
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    const body = req.body;
    const password = body.password
    const hashedPassword = bcrypt.hashSync(password, 10)
    const data = { ...body, password: hashedPassword }

    try {
        await UserDataBase.create(data)
        res.status(200).send({ message: "user created" })
    } catch (err) {
        res.status(500).send(error)
    }
};

const getUsers = async (req, res) => {
    const userId = req.params.userId
    console.log(userId)
    try {
        if (userId) {
            const user = await UserDataBase.findById(userId);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send("Not Found")
            }
        } else {
            const users = await UserDataBase.find();
            res.status(200).send(users);
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Error" })
    }
}

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await UserDataBase.findOne({ email: email })
        const hashedPassword = user.password
        const isUser = bcrypt.compareSync(password, hashedPassword)
        if (isUser) {
            res.status(200).send({ userId: user.id })
        } else {
            res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).send(error)
    }

}



module.exports = { createUser, loginUser, getUsers }