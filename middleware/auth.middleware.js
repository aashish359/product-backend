const jwt = require('jsonwebtoken')
const config = require('../config/config')

const verifyUser = (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = header.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const result = jwt.verify(token, config.jwtSecret);

    if (!result) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    return next();
  } catch (err) {
    console.log('Error at verifyUser', err);

    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

module.exports = { verifyUser };
