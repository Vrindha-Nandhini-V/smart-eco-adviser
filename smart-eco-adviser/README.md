# Smart Eco Adviser 🌱

A comprehensive web application for tracking carbon footprints, providing eco-friendly recommendations, and promoting sustainable living through challenges and analytics.

## Features ✨

### User Features
- **Carbon Footprint Calculator**: Multi-step calculator to estimate annual CO₂ emissions
- **Analytics Dashboard**: Dynamic visualizations of carbon footprint trends and progress
- **Eco Tips**: Weather-based and personalized eco-friendly recommendations
- **Challenges**: Daily, weekly, and monthly eco-challenges to build sustainable habits
- **AI Chatbot**: Powered by Google Gemini for eco-friendly advice
- **Progress Tracking**: Monitor your environmental impact over time

### Admin Features
- **Admin Dashboard**: Comprehensive view of all users and their progress
- **Challenge Management**: Create, update, and delete eco-challenges
- **User Monitoring**: Track user carbon footprints, eco actions, and completed challenges
- **Statistics**: View platform-wide environmental impact metrics

## Tech Stack 🛠️

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **APIs**: 
  - Google Gemini AI
  - OpenWeatherMap (for weather-based tips)
  - Carbon Interface API (for carbon calculations)

## Installation 🚀

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or pnpm

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/smart-eco-adviser
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
CARBON_INTERFACE_API_KEY=your_carbon_interface_api_key
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file:
```bash
cp env.example .env.local
```

4. Configure your `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The frontend will run on `http://localhost:3000`

## API Keys Setup 🔑

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your Backend `.env` file

### OpenWeatherMap API
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to your Backend `.env` file

### AQI CN API (Air Quality - Optional but Recommended)
1. Sign up at [AQI CN](https://aqicn.org/data-platform/token/)
2. Get your free API token
3. Add it to your Backend `.env` file as `AQICN_API_KEY`

### Carbon Interface API (Optional)
1. Sign up at [Carbon Interface](https://www.carboninterface.com/)
2. Get your API key
3. Add it to your Backend `.env` file as `CARBON_INTERFACE_API_KEY`

## Usage 📖

### Creating an Admin User

To create an admin user, you need to manually update a user's role in MongoDB:

1. Create a regular user account through the signup page
2. Connect to your MongoDB database
3. Find the user and update their role:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### User Workflow

1. **Sign Up/Login**: Create an account or login
2. **Calculate Footprint**: Use the calculator to estimate your carbon footprint
3. **View Analytics**: Check your dashboard for insights and trends
4. **Get Eco Tips**: Receive personalized recommendations
5. **Join Challenges**: Participate in eco-friendly challenges
6. **Track Progress**: Monitor your environmental impact over time

### Admin Workflow

1. **Login as Admin**: Use your admin credentials
2. **Access Admin Dashboard**: Click the "Admin" button in navigation
3. **View Users**: Monitor all user progress and statistics
4. **Manage Challenges**: Create new challenges or modify existing ones
5. **Track Impact**: View platform-wide environmental metrics

## Project Structure 📁

```
smart-eco-adviser/
├── Backend/
│   ├── config/          # Database and API configurations
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth and admin middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
│
└── frontend/
    ├── app/             # Next.js pages
    │   ├── admin/       # Admin dashboard
    │   ├── analytics/   # Analytics page
    │   ├── calculator/  # Carbon calculator
    │   ├── challenges/  # Challenges page
    │   ├── chatbot/     # AI chatbot
    │   ├── login/       # Login page
    │   ├── signup/      # Signup page
    │   └── recommendations/ # Eco tips page
    ├── components/      # Reusable React components
    ├── lib/             # Utility functions and API client
    └── public/          # Static assets
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Carbon Footprint
- `POST /api/carbon/calculate` - Save carbon footprint calculation
- `GET /api/carbon/history` - Get user's carbon footprint history
- `GET /api/carbon/analytics` - Get analytics data

### Challenges
- `GET /api/challenges` - Get all active challenges
- `GET /api/challenges/user` - Get user's challenges with progress
- `POST /api/challenges/:id/start` - Start a challenge
- `PUT /api/challenges/:id/progress` - Update challenge progress
- `POST /api/challenges` - Create challenge (Admin only)
- `PUT /api/challenges/:id` - Update challenge (Admin only)
- `DELETE /api/challenges/:id` - Delete challenge (Admin only)

### Eco Tips
- `GET /api/eco-tips` - Get dynamic eco tips (supports lat, lon, city params)

### Admin
- `GET /api/admin/users` - Get all users with progress (Admin only)
- `GET /api/admin/users/:id` - Get user details (Admin only)
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)

## Environment Variables 🔐

### Backend (.env)
```env
MONGO_URI=              # MongoDB connection string
JWT_SECRET=             # Secret key for JWT tokens
PORT=                   # Server port (default: 5000)
GEMINI_API_KEY=         # Google Gemini API key
OPENWEATHER_API_KEY=    # OpenWeatherMap API key
AQICN_API_KEY=          # AQI CN API key for air quality (optional)
CARBON_INTERFACE_API_KEY= # Carbon Interface API key (optional)
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=    # Backend API URL
```

## Features in Detail 🎯

### Carbon Calculator
- Multi-step form for comprehensive data collection
- Categories: Transportation, Energy, Diet, Waste
- Real-time calculation with visual breakdown
- Automatic saving to user profile
- Comparison with national averages

### Analytics Dashboard
- Monthly carbon footprint trends
- Category-wise breakdown (Pie charts, Area charts)
- Progress tracking towards goals
- Eco actions counter
- Achievement system

### Eco Tips
- Weather-based recommendations using OpenWeatherMap
- Location-aware suggestions
- Category-specific tips (Transportation, Energy, Diet, Waste)
- Dynamic content based on environmental conditions

### Challenge System
- Three types: Daily, Weekly, Monthly
- Four categories: Transportation, Energy, Diet, Waste
- Difficulty levels: Easy, Medium, Hard
- Points and CO₂ impact tracking
- Progress monitoring
- Leaderboard system

### Admin Dashboard
- User management and monitoring
- Challenge creation and management
- Platform-wide statistics
- CO₂ savings tracking
- User progress overview

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the ISC License.

## Support 💬

For support, please open an issue in the GitHub repository.

## Acknowledgments 🙏

- Google Gemini AI for intelligent eco-advice
- OpenWeatherMap for weather data
- shadcn/ui for beautiful UI components
- Recharts for data visualization

---

Built with 💚 for a sustainable future
