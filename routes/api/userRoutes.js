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

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(addUser);
// example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// /api/users/:userId
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
    
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
