const bcrypt = require('bcryptjs')

function generatePassword(password){
    const salt = bcrypt.genSaltSync(15)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}
function compare(password, hash){
    return bcrypt.compareSync(password, hash)
}
module.exports = {generatePassword, compare}