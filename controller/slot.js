// DUMMY DATA
const Slots = require('../model/slot');
// SLOTS MODEL
const slots = require('../data/slots');

// INSERT DUMMY DATA
exports.addSlots = async (req, res) => {
  const insertedSlots = await Slots.insertMany(slots);
  if (insertedSlots) {
    res
      .status(200)
      .json({ message: 'slots added successfully !', slot: insertedSlots });
  } else {
    res.status(400).json({ message: 'Failed to add slots !' });
  }
};

// LIST ALL SLOTS
exports.listSlots = async (req, res) => {
  const getSlots = await Slots.find({});
  if (getSlots) {
    res
      .status(200)
      .json({ message: 'slots fetched successfully !', slots: getSlots });
  } else {
    res.status(400).json({ message: 'Failed to fetch slots !' });
  }
};

// GETTING DETAIL OF SINGLE SLOT
exports.getDetail = async (req, res) => {
  const slotData = await Slots.findById(req.params.id);
  if (slotData) {
    res
      .status(200)
      .json({ message: 'slots fetched successfully !', slotData: slotData });
  } else {
    res.status(400).json({ message: 'Failed to fetch slots !' });
  }
};

// UPDATING SLOT
exports.markAsBooked = async (req, res) => {
  const { firstname, lastname, mobile, id } = req.body;
  let query = {
    firstname: firstname,
    lastname: lastname,
    mobile: mobile,
    isBooked: true,
  };
  const updatedSlot = await Slots.updateOne({ _id: id }, { $set: query });
  if (updatedSlot) {
    res
      .status(200)
      .json({ message: 'slots fetched successfully !', slotData: updatedSlot });
  } else {
    res.status(400).json({ message: 'Failed to update slots !' });
  }
};

// DELETE COLLECTION
exports.deleteSlotes = async (req, res) => {
  const deleted = await Slots.remove();
  if (deleted) {
    res.status(200).json({ message: 'Slots deleted successfully', deleted });
  } else {
    res.status(400).json({ message: 'Failed to delete' });
  }
};
