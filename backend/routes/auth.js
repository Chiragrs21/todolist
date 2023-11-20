const express = require('express')
const user1 = require('../models/user')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwt_secret = 'cidyg8fygc8ywfwif'

const router = express.Router();
router.post('/', [
    body("name", "Name already Exist").isLength({ min: 5 }),
    body("Email", "Enter the valid Email id").isEmail(),
    body("Password", "PAssword should have 5 character").isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // const login = new user1(req.body)
        // login.save()
        // or
        let salt = await bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.Password, salt);
        let email = await user1.findOne({ Email: req.body.Email })
        if (email) {
            return res.json({ 'msg': 'Email already found' })
        }
        const user = user1.create({
            name: req.body.name,
            Email: req.body.Email,
            Password: hash
        })

        const data = {
            id: user.id
        }

        const jwtdata = jwt.sign(data, jwt_secret)

        res.json({ "access Token": jwtdata })
    }
    catch {
        res.json({ "error": "occured" })
    }

})


router.post('/loginuser', async (req, res) => {
    try {

        let user = await user1.findOne({ Email: req.body.Email })

        let passwordcompare = await bcrypt.compare(req.body.Password, user.Password)
        if (!user && !passwordcompare) {

            res.json.status(401)({ "Msg": "Unable to find the user" })
        }
        if (user && passwordcompare) {
            // res.json({ "msg": "logined succesfully" })
            const data = {
                id: user.id
            }
            const jwtdata = jwt.sign(data, jwt_secret)

            res.json({
                "access Token": jwtdata,
                "message": "Logged in sucessfuly"
            })
        }
    }
    catch (err) {
        console.log(err.message)
        res.json({ "Error": "not able to find" }).status(400)
    }
})

//route to get the user info after login 

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        let userid = req.collection.id
        const user = await user1.findById(userid).select("-Password")
        res.json(user)
    }
    catch (err) {
        res.json(err.message).status(400)
    }

})

module.exports = router