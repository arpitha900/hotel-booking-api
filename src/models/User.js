const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    address: { type: String, trim: true },
  },
  { timestamps: true }
);

userSchema.index({ name: 'text', email: 'text', phone: 'text' });

module.exports = mongoose.model('User', userSchema);
