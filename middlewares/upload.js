const multerStorage = require('./uploadfiles');
const multerFilter = require('./filterFile');
const multer = require('multer');

module.exports = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});