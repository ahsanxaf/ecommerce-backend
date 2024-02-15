const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "Email or Password is incorrect" });
    } else if (user.password === req.body.password) {
      // TODO: we will make addresses independent of login
      res.status(201).json({id: user.id, email: user.email, name: user.name, addresses: user.addresses});
    } else {
      res.status(401).json({ message: "Email or Password is incorrect" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
