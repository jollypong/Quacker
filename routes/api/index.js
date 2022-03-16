const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
//user routes
router.use('/users', userRoutes);
//thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;
