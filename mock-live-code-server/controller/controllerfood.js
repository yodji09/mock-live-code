const {Food} = require('../models')

class ControllerFood {
    static create(req, res, next){
        const {title, price, ingredients, tag} = req.body
        const id = req.currentUser
        const value = {
            title,
            price,
            ingredients,
            tag,
            UserId : id
        }
        Food
            .create(value)
            .then(result => {
                res.status(201).json({
                    Food : result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error : err
                })
            })
    }
    static findAll(req, res, next){
        const id = req.currentUser
        Food
            .findAll({
                where : {
                    UserId : id
                }
            })
            .then(result => {
                res.status(200).json({
                    Foods : result
                })
            })
            .catch(err => {
                res.status(500).json({
                    Error : err
                })
            })
    }
    static delete(req, res, next){
        const {id} = req.params
        Food
            .destroy({
                where : {
                    id,
                }
            })
            .then(result => {
                res.status(200).json({
                    msg : `Succesfully destroy food with id ${id}`
                })
            })
            .catch(err => {
                res.status(500).json({
                    Error : err
                })
            })
    }
}

module.exports = ControllerFood