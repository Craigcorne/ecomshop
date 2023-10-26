const mongoose = require("mongoose");

const guestUserSchema = new mongoose.Schema({
  guestName: String,
  guestEmail: String,
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("GuestUser", guestUserSchema);
