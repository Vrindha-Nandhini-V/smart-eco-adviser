const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

// @desc    User Signup
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" })
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

// @desc    User Login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    // Update daily login streak
    const now = new Date()
    const prev = user.lastLoginAt ? new Date(user.lastLoginAt) : null

    const normalize = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
    const today = normalize(now)
    let streak = user.streakCount || 0

    if (!prev) {
      streak = 1
    } else {
      const prevDay = normalize(prev)
      const diffDays = Math.round((today - prevDay) / (1000 * 60 * 60 * 24))
      if (diffDays === 0) {
        // same day, keep streak
      } else if (diffDays === 1) {
        streak = streak + 1
      } else {
        streak = 1
      }
    }

    user.streakCount = streak
    user.lastLoginAt = now
    await user.save()

    const token = generateToken(user._id)
    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        streakCount: user.streakCount
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
}

module.exports = { signup, login }


