const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
    const {id} = req.user;
  try {
    const user = await User.findById(id);
    res.status(200).json({id:user.id, addresses: user.addresses, email: user.email, role: user.role});
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
