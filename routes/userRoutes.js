const { Router } = require('express')
const bcrypt = require("bcrypt")
const { createUser, loginUser, getUsers } = require('../controllers/userController')
const UserDataBase = require('../database/schema/userSchema')
const router = Router()


const validateInput = async (req, res, next) => {
    // first get body from request 
    // UserDataBase in find one ashiglan emailer user ig olno <await ashiglana>
    // herve user oldvol aldaa gej uzed "hereglegdsen" gej butsaana
    // ugui bol daragin uildel ruu shiljine <next() function ashiglana>

    const body = req.body
    const user = await UserDataBase.findOne({ email: body.email })
    if (user) {
        res.status(403).send({ message: "email address is already used" })
    } else {
        next()
    }

};

const validatePassword = async (req, res, next) => {
    const body = req.body;
    const user = await UserDataBase.findOne({ email: body.email });

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(body.password, user?.password)

        if (isPasswordCorrect) {
            next();
        } else {
            res.status(404).send("Password is incorrect")
        }
    } else {
        res.status(404).send("user not found")
    }
}

router.post("/login", validatePassword, loginUser)
router.post('/signup', validateInput, createUser)
router.get("/users/:userId", getUsers)


module.exports = router
