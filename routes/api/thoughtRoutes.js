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
router.route('/')
  .get(getAllThoughts)
  .post(addThought);
// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "userName": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions/')
  .post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router; 