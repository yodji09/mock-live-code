const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

function authentication(req, res, next){
    let {token} = req.headers
    try {
        let decode = verifyToken(token)
        let {id} = decode
        User
            .findByPk(id)
            .then(user => {
                if (user){
                    req.currentUser = id
                    return next()
                } else {
                    res.status(404).json({
                        code : 404,
                        type : "Not Found",
                        msg : "Please Login First"
                    })
                }
            })
    } catch (err){
        // next(err)
    }
}

module.exports = authentication