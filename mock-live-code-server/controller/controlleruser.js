const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register(req, res, next){
        const {email, password} = req.body
        const value = {
            email,
            password
        }
        console.log(value)
        User
            .create(value)
            .then(user => {
                res.status(201).json({
                    id : user.id,
                    email : user.email
                })
            })
            .catch(err => {
                res.status(501).json({
                    code : 501,
                    type : "Not Implemented",
                    msg : "Cannot Create User"
                })
            })
    }
    static login(req, res, next){
        const {email, password} = req.body
        User
            .findOne({
                where : {
                    email,
                }
            })
            .then(result => {
                if(compare(password, result.password)){
                    let token = generateToken({
                        id : result.id,
                        email : result.email
                    })
                    res.status(200).json({
                        acces_token : token
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    code : 500,
                    type : "Internal Server Error",
                    msg : "Something Went Wrong"
                })
            })
    }
}

module.exports = UserController