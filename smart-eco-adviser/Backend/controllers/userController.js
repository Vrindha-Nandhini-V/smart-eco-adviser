const User = require('../models/User');
const CarbonFootprint = require('../models/CarbonFootprint');
const UserChallenge = require('../models/UserChallenge');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, location } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, location },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user stats
exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get completed challenges count
    const completedChallenges = await UserChallenge.countDocuments({
      user: userId,
      status: 'completed'
    });

    // Get active challenges count
    const activeChallenges = await UserChallenge.countDocuments({
      user: userId,
      status: 'in_progress'
    });

    // Get total CO2 saved from carbon footprints
    const carbonData = await CarbonFootprint.find({ user: userId });
    let totalCO2Saved = 0;
    
    if (carbonData.length > 1) {
      // Calculate reduction from first to latest
      const firstFootprint = carbonData[0].total;
      const latestFootprint = carbonData[carbonData.length - 1].total;
      if (firstFootprint > latestFootprint) {
        totalCO2Saved = (firstFootprint - latestFootprint) / 1000; // Convert to tons
      }
    }

    // Calculate level based on completed challenges (simple formula)
    const xp = completedChallenges * 100;
    const level = Math.floor(xp / 1000) + 1;
    const nextLevelXp = level * 1000;

    // Fetch user to read login streak
    const userDoc = await User.findById(userId).select('streakCount')
    // Use login-based streak if available, else fallback to activity-based streak in last 7 days
    let activityStreak = await UserChallenge.countDocuments({
      user: userId,
      status: 'completed',
      completedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    const streak = (userDoc && userDoc.streakCount) ? userDoc.streakCount : Math.min(activityStreak, 30)

    // Get achievements count
    const achievements = Math.min(Math.floor(completedChallenges / 3), 10);

    res.json({
      level,
      xp: completedChallenges * 100,
      nextLevelXp,
      streak: Math.min(streak, 365),
      loginStreak: userDoc?.streakCount || 0,
      totalChallenges: completedChallenges + activeChallenges,
      completedChallenges,
      activeChallenges,
      co2Saved: totalCO2Saved.toFixed(2),
      achievements
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: error.message });
  }
};
