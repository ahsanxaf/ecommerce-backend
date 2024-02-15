const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
    const {id} = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  };
