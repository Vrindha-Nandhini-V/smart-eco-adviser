const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['transportation', 'energy', 'diet', 'waste'], 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['daily', 'weekly', 'monthly'], 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    required: true 
  },
  points: { type: Number, required: true },
  co2Impact: { type: Number, required: true },
  duration: { type: String, required: true },
  maxProgress: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model("Challenge", challengeSchema);
