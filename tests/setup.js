const mongoose = require('mongoose');
const keys = require('../config/keys'); // Ensure `keys.mongoURI` contains the correct DB URI

jest.setTimeout(30000);

(async () => {
  try {
    await mongoose.connect(keys.mongoURI, {});
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();
