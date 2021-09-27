const router = require('express').Router();
const {
  addSlots,
  listSlots,
  getDetail,
  markAsBooked,
  deleteSlotes,
} = require('../controller/slot');

router.route('/addmany').post(addSlots);
router.route('/getall').get(listSlots);
router.route('/:id').get(getDetail).put(markAsBooked);
router.route('/deleteall').delete(deleteSlotes);

module.exports = router;
