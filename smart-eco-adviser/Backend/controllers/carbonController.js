const User = require("../models/User");

// @desc    Save carbon footprint calculation
// @route   POST /api/carbon/calculate
// @access  Private
const saveCalculation = async (req, res) => {
  try {
    const { total, breakdown } = req.body;

    if (!total || !breakdown) {
      return res.status(400).json({ error: "Please provide total and breakdown" });
    }

    const user = await User.findById(req.user._id);
    
    // Add to history
    user.carbonFootprint.history.push({
      date: new Date(),
      total,
      breakdown
    });

    // Update current footprint
    user.carbonFootprint.current = total;

    await user.save();

    res.json({
      message: "Carbon footprint saved successfully",
      carbonFootprint: user.carbonFootprint
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user's carbon footprint history
// @route   GET /api/carbon/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('carbonFootprint');
    res.json(user.carbonFootprint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get analytics data
// @route   GET /api/carbon/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('carbonFootprint ecoActions completedChallenges');
    
    const history = user.carbonFootprint.history;
    const monthlyData = [];
    
    // Get last 6 months of data
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthRecords = history.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= monthDate && recordDate <= monthEnd;
      });

      if (monthRecords.length > 0) {
        // Get the latest record for the month
        const latestRecord = monthRecords[monthRecords.length - 1];
        monthlyData.push({
          month: monthDate.toLocaleDateString('en-US', { month: 'short' }),
          footprint: latestRecord.total,
          transportation: latestRecord.breakdown.transportation,
          energy: latestRecord.breakdown.energy,
          diet: latestRecord.breakdown.diet,
          waste: latestRecord.breakdown.waste
        });
      } else {
        monthlyData.push({
          month: monthDate.toLocaleDateString('en-US', { month: 'short' }),
          footprint: 0,
          transportation: 0,
          energy: 0,
          diet: 0,
          waste: 0
        });
      }
    }

    res.json({
      currentFootprint: user.carbonFootprint.current,
      monthlyData,
      ecoActions: user.ecoActions,
      completedChallenges: user.completedChallenges.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  saveCalculation,
  getHistory,
  getAnalytics
};
