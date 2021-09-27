// USERS MODEL
const Users = require('../model/user');

// REGISTER USER
exports.registerUser = async (req, res) => {
  const userExist = await Users.findOne({ mobile: req.body.mobile });
  if (userExist) {
    res.status(200).json({ message: 'User already exist !' });
  } else {
    const createdUser = await Users.create(req.body);
    if (createdUser) {
      res
        .status(200)
        .json({ message: 'User registered successfully !', user: createdUser });
    } else {
      res.status(400).json({ message: 'Failed to create user !' });
    }
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  const user = await Users.findOne({ mobile: req.body.mobile });
  if (user) {
    res.status(200).json({ message: 'User login successfully !', user });
  } else {
    res.status(400).json({ message: 'user does not exist !' });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const deletedUser = await Users.deleteOne({ _id: req.params.id });
  if (deletedUser) {
    res
      .status(200)
      .json({ message: 'User deleted successfully !', deletedUser });
  } else {
    res.status(400).json({ message: 'user does not exist !' });
  }
};
