const {Food} = require('../models')

function authorization(req, res, next){
    const id = req.currentUser
    const foodId = req.params.id
    Food
        .findByPk(foodId)
        .then(result => {
            if(result.UserId === id){
                next()
            } else {
                res.status(401).json({
                    code : 401,
                    type : "Not Authorized",
                    msg : "You Doesnt Allowed to do This"
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
module.exports = authorization