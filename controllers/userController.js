const { User, Thought } = require('../models');

const userController = {
  // get all users, /api/users
  getAllUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // add user /api/users
  addUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },

  // get user by ID /api/users/:userId
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update User /api/users/:userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete User /api/users/:userId
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
            { user: req.params.userId },
            { $pull: { user: req.params.userId } },
            { new: true }
          )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
            message: 'User deleted, but no thoughts found',
          })
          : res.json({ message: 'User and associated thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add friend /api/users/:userId/friends/:friendId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID!' })
          : res.json({user, message: "Friend added successfully!"})
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete friend /api/users/:userId/friends/:friendId
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json({user, message: "Successfully deleted!"})
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;