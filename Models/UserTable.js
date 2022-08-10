const UserTable  = require('../Models/User')

const Table = UserTable.sync({force:false});

module.exports = Table;