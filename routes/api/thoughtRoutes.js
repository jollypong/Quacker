const router = require('express').Router();
const {
  getAllThoughts,
  getThought, //get thought by ID
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getAllThoughts)

// /api/thoughts/:userId
router.route('/:userId')
  .post(addThought);

// /api/thoughts/:thoughtId 
router.route('/thoughtId')
  .get(getThought)
  .put(updateThought)

// /api/thoughts/:thoughtId/:userId
router.route('/:thoughtId/:userId')
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router; 