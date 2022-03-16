const router = require('express').Router();

const {
    getAllUsers,
    getUser, //get user by ID
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router.route('/')
    .get()
    .post();

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(addUser);

// /api/users/:id
router.route('/:id')
    .get(getUser) 
    .put(updateUser)
    .delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;