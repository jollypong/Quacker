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

router.route('/')
  .get(getAllThoughts)
  .post(addThought);
// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
router.route('/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions/')
  .post(addReaction)
  .delete(deleteReaction)

module.exports = router; 