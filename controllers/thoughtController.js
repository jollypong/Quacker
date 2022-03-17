const { User, Thought } = require('../models');

const thoughtController = {
  // get All Thoughts /api/thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // add thought /api/thoughts
  addThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created new Thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get thought by ID /api/thoughts/:thoughtId
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update Thought,
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete Thought,
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : Reaction.findOneAndUpdate(
            { reaction: req.params.reactionId },
            { $pull: { thought: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({
            message: 'Thought deleted, but no reaction was found!',
          })
          : res.json({ message: 'Thought and associated reactions successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add Reaction,
  addReaction(req, res) {
    // console.log('You are adding an reaction');
    // console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No Thought found with that ID :(' })
          : res.json({ message: "Successfully updated!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID' })
          : res.json({ message: "Successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;