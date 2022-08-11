const router = require('router');
const controller = require('../controllers/Controller');
const projectController = require("../controllers/ProjectController/");
const route = router();
const upload = require('../middlewares/upload');

route.get('/migration',controller.createTable);
route.get('/:qrcode', projectController.index);
route.post('/', upload.single('excel'), projectController.create);
route.put('/', projectController.update);
route.delete('/', projectController.delete);

module.exports = route;