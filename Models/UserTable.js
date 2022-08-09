const UserTable  = require('../Models/User')

const Table = UserTable.sync({force:false});
console.log(Table)

module.exports = Table;