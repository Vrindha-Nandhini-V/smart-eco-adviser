const User = require("../models/User");
const Challenge = require("../models/Challenge");
const UserChallenge = require("../models/UserChallenge");

// @desc    Get all users with their progress (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .populate('completedChallenges')
      .sort({ createdAt: -1 });

    const usersWithProgress = await Promise.all(users.map(async (user) => {
      const activeChallenges = await UserChallenge.countDocuments({
        userId: user._id,
        status: 'in_progress'
      });

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        carbonFootprint: user.carbonFootprint.current,
        ecoActions: user.ecoActions,
        completedChallenges: user.completedChallenges.length,
        activeChallenges,
        joinedDate: user.createdAt
      };
    }));

    res.json(usersWithProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user details (Admin only)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('completedChallenges');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userChallenges = await UserChallenge.find({ userId: user._id })
      .populate('challengeId');

    res.json({
      user,
      challenges: userChallenges
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get dashboard statistics (Admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalChallenges = await Challenge.countDocuments({ isActive: true });
    const activeChallenges = await UserChallenge.countDocuments({ status: 'in_progress' });
    const completedChallenges = await UserChallenge.countDocuments({ status: 'completed' });

    // Calculate total CO2 saved
    const users = await User.find({ role: 'user' }).select('carbonFootprint');
    const totalCO2Saved = users.reduce((sum, user) => {
      if (user.carbonFootprint.history.length > 1) {
        const first = user.carbonFootprint.history[0].total;
        const latest = user.carbonFootprint.current;
        return sum + Math.max(0, first - latest);
      }
      return sum;
    }, 0);

    res.json({
      totalUsers,
      totalChallenges,
      activeChallenges,
      completedChallenges,
      totalCO2Saved: Math.round(totalCO2Saved * 100) / 100
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserDetails,
  getDashboardStats
};
