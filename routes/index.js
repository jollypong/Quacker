//import routes
const router = require('express').Router();
const apiRoutes = require('./api');

//middle wares
router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
