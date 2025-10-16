const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  carbonFootprint: {
    current: { type: Number, default: 0 },
    history: [{
      date: { type: Date, default: Date.now },
      total: { type: Number, required: true },
      breakdown: {
        transportation: { type: Number, default: 0 },
        energy: { type: Number, default: 0 },
        diet: { type: Number, default: 0 },
        waste: { type: Number, default: 0 }
      }
    }]
  },
  completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  ecoActions: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

//User.js