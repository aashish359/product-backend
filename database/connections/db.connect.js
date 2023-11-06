const mongoose = require('mongoose');
const config = require('../../config/config');

const setupConnection = async (msg = 'connected to database') => {
  try {
    const mongoUri = config.dbUrl;
    // setup connection
    await mongoose.connect(mongoUri);
    console.log('connected to mongodb')
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setupConnection }
