# Quick Start Guide 🚀

Get the Smart Eco Adviser up and running in 5 minutes!

## Prerequisites
- Node.js v18+
- MongoDB (running locally or MongoDB Atlas account)
- Git

## Step 1: Clone & Install

```bash
# Navigate to the project
cd smart-eco-adviser

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure Environment Variables

### Backend (.env)
```bash
cd Backend
cp .env.example .env
```

Edit `.env` and add:
```env
MONGO_URI=mongodb://localhost:27017/smart-eco-adviser
JWT_SECRET=your-super-secret-key-change-this-in-production
PORT=5000
GEMINI_API_KEY=your-gemini-api-key-here
OPENWEATHER_API_KEY=your-openweather-key-here
CARBON_INTERFACE_API_KEY=optional
```

### Frontend (.env.local)
```bash
cd ../frontend
cp env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB

### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

### Option B: MongoDB Atlas
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGO_URI` in Backend `.env`

## Step 4: Start the Application

### Terminal 1 - Backend
```bash
cd Backend
npm start
```
Backend runs on: `http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

## Step 5: Create Your First User

1. Open browser: `http://localhost:3000`
2. Click "Sign Up"
3. Fill in your details
4. Login with your credentials

## Step 6: Create an Admin User (Optional)

### Using MongoDB Compass or Shell:
```javascript
// Connect to your database
use smart-eco-adviser

// Update a user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Using MongoDB Shell:
```bash
mongosh
use smart-eco-adviser
db.users.updateOne({email: "your-email@example.com"}, {$set: {role: "admin"}})
```

## Step 7: Test the Features

### As a User:
1. ✅ Calculate your carbon footprint
2. ✅ View analytics dashboard
3. ✅ Browse eco tips
4. ✅ Join challenges
5. ✅ Chat with AI bot

### As an Admin:
1. ✅ Access admin dashboard (click "Admin" in nav)
2. ✅ Create new challenges
3. ✅ View user statistics
4. ✅ Monitor platform metrics

## Getting API Keys (Free)

### Google Gemini AI
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste into `.env`

### OpenWeatherMap
1. Visit: https://openweathermap.org/api
2. Sign up for free account
3. Get API key from dashboard
4. Copy and paste into `.env`

### Carbon Interface (Optional)
1. Visit: https://www.carboninterface.com/
2. Sign up for free tier
3. Get API key
4. Copy and paste into `.env`

## Troubleshooting

### Backend won't start
- ✅ Check MongoDB is running
- ✅ Verify `.env` file exists and has correct values
- ✅ Run `npm install` again

### Frontend won't start
- ✅ Check `.env.local` file exists
- ✅ Verify backend is running on port 5000
- ✅ Run `npm install` again
- ✅ Clear `.next` folder: `rm -rf .next`

### Can't login
- ✅ Check backend console for errors
- ✅ Verify MongoDB connection
- ✅ Check JWT_SECRET is set in `.env`

### API errors
- ✅ Verify API keys are correct
- ✅ Check API key quotas (free tiers have limits)
- ✅ Look at backend console for detailed errors

### Database errors
- ✅ Ensure MongoDB is running
- ✅ Check connection string format
- ✅ Verify database name is correct

## Default Ports

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## Useful Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run linter
```

### Database
```bash
mongosh                                    # Connect to MongoDB
use smart-eco-adviser                      # Switch to database
db.users.find()                           # List all users
db.challenges.find()                      # List all challenges
db.users.updateOne({email: "..."}, {...}) # Update user
```

## Project Structure Quick Reference

```
smart-eco-adviser/
├── Backend/
│   ├── controllers/    # Business logic
│   ├── models/        # Database schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & validation
│   └── index.js       # Server entry
│
└── frontend/
    ├── app/           # Next.js pages
    ├── components/    # React components
    ├── lib/          # Utilities & API
    └── public/       # Static files
```

## Next Steps

1. 📖 Read the full [README.md](./README.md)
2. 🔍 Check [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
3. 🎨 Customize the UI to your liking
4. 🚀 Deploy to production (Vercel, Railway, etc.)

## Need Help?

- Check the console for error messages
- Review the API documentation in README.md
- Ensure all environment variables are set
- Verify MongoDB connection

## Production Deployment Tips

1. **Environment Variables:**
   - Use strong, random JWT_SECRET
   - Update MONGO_URI to production database
   - Set NODE_ENV=production

2. **Security:**
   - Enable HTTPS
   - Configure CORS properly
   - Add rate limiting
   - Validate all inputs

3. **Performance:**
   - Enable caching
   - Optimize images
   - Use CDN for static assets
   - Monitor API usage

## Success! 🎉

You should now have:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ MongoDB connected
- ✅ User authentication working
- ✅ All features accessible

Happy coding! 🌱💚
