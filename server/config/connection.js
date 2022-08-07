const mongoose = require("mongoose");
require("dotenv").config();

// `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@googlebooksapp.rsfw78w.mongodb.net/?retryWrites=true&w=majority`,

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/chronoflix`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
