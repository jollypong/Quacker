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
      .select('-__v')
      .populate([
        {path: 'thoughts', select: "-__v" }, 
        {path: 'thoughts', select: "-__v" }
      ])
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
  // delete User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : friend.deleteMany({ _id: { $in: user.friends } })
      )
      .then(() => res.json({ message: 'User and friends deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // add friend
  // delete friend
};

module.exports = userController;