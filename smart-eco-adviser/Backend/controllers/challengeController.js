const Challenge = require("../models/Challenge");
const UserChallenge = require("../models/UserChallenge");
const User = require("../models/User");

// @desc    Get all active challenges
// @route   GET /api/challenges
// @access  Private
const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user's challenges with progress
// @route   GET /api/challenges/user
// @access  Private
const getUserChallenges = async (req, res) => {
  try {
    const userChallenges = await UserChallenge.find({ userId: req.user._id })
      .populate('challengeId')
      .sort({ createdAt: -1 });
    res.json(userChallenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Start a challenge
// @route   POST /api/challenges/:id/start
// @access  Private
const startChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    // Check if user already started this challenge
    const existing = await UserChallenge.findOne({
      userId: req.user._id,
      challengeId: req.params.id
    });

    if (existing) {
      return res.status(400).json({ error: "Challenge already started" });
    }

    const userChallenge = await UserChallenge.create({
      userId: req.user._id,
      challengeId: req.params.id,
      status: 'in_progress',
      startDate: new Date()
    });

    const populated = await UserChallenge.findById(userChallenge._id).populate('challengeId');
    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update challenge progress
// @route   PUT /api/challenges/:id/progress
// @access  Private
const updateChallengeProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const userChallenge = await UserChallenge.findOne({
      userId: req.user._id,
      challengeId: req.params.id
    }).populate('challengeId');

    if (!userChallenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    userChallenge.progress = progress;

    // Check if challenge is completed
    if (progress >= userChallenge.challengeId.maxProgress) {
      userChallenge.status = 'completed';
      userChallenge.completedDate = new Date();

      // Update user's completed challenges and eco actions
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { completedChallenges: req.params.id },
        $inc: { ecoActions: 1 }
      });
    }

    await userChallenge.save();
    res.json(userChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Create a new challenge (Admin only)
// @route   POST /api/challenges
// @access  Private/Admin
const createChallenge = async (req, res) => {
  try {
    const { title, description, category, type, difficulty, points, co2Impact, duration, maxProgress } = req.body;

    if (!title || !description || !category || !type || !difficulty || !points || !co2Impact || !duration || !maxProgress) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const challenge = await Challenge.create({
      title,
      description,
      category,
      type,
      difficulty,
      points,
      co2Impact,
      duration,
      maxProgress,
      createdBy: req.user._id
    });

    res.status(201).json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update a challenge (Admin only)
// @route   PUT /api/challenges/:id
// @access  Private/Admin
const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    res.json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete a challenge (Admin only)
// @route   DELETE /api/challenges/:id
// @access  Private/Admin
const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    res.json({ message: "Challenge deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getChallenges,
  getUserChallenges,
  startChallenge,
  updateChallengeProgress,
  createChallenge,
  updateChallenge,
  deleteChallenge
};
