const mongoose = require("mongoose");

const userChallengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  status: { 
    type: String, 
    enum: ['not_started', 'in_progress', 'completed'], 
    default: 'not_started' 
  },
  progress: { type: Number, default: 0 },
  startDate: { type: Date },
  endDate: { type: Date },
  completedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("UserChallenge", userChallengeSchema);
