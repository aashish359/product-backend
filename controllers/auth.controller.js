const Users = require('../database/db-models/users')
const { hashPassword, comparePassword } = require('../helpers/auth.helper');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid username or password' });
    }

    console.log({ password, hash: user.password })

    const isPasswordCorrect = comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' })
    }

    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });

    return res.status(200).json({ success: true, message: 'Login successful', data: { token } });
  } catch (err) {
    console.log('Error at authController.login', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await Users.findOne({ username }, { _id: 1 });

    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    console.log(req.body)

    const hash = await hashPassword(password);

    user = await Users.create({
      username,
      password: hash
    })

    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.log('Error at authController.register', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { login, register }
