# API Comparison Guide

## Summary of APIs Used in Smart Eco Adviser

### Required APIs ✅

#### 1. **Google Gemini AI**
- **Purpose**: AI-powered chatbot for eco-friendly advice
- **Cost**: Free tier available
- **Get it**: https://makersuite.google.com/app/apikey
- **Used for**: Intelligent conversations about sustainability
- **Status**: ✅ Required

#### 2. **OpenWeatherMap**
- **Purpose**: Weather data for location-based eco tips
- **Cost**: Free tier (60 calls/minute)
- **Get it**: https://openweathermap.org/api
- **Used for**: Weather-based recommendations (e.g., "It's sunny, bike instead of drive!")
- **Status**: ✅ Required for eco tips feature

### Optional APIs 🔧

#### 3. **AQI CN (Air Quality)**
- **Purpose**: Real-time air quality data worldwide
- **Cost**: Free with API token
- **Get it**: https://aqicn.org/data-platform/token/
- **Used for**: 
  - Air quality-based recommendations
  - Pollution level alerts
  - Outdoor activity suggestions
- **Example tips**:
  - "Air quality is excellent (AQI: 35) - Perfect for cycling!"
  - "Poor air quality (AQI: 165) - Stay indoors, use air purifiers"
- **Status**: ⭐ Recommended (enhances eco tips)

#### 4. **Carbon Interface**
- **Purpose**: Carbon footprint calculations for various activities
- **Cost**: Free tier available (limited requests)
- **Get it**: https://www.carboninterface.com/
- **Used for**: 
  - Detailed carbon calculations
  - Flight emissions
  - Shipping emissions
  - Electricity usage
- **Status**: Optional (app has built-in calculator)

## Comparison Table

| API | Purpose | Free Tier | Required | Used In |
|-----|---------|-----------|----------|---------|
| **Google Gemini** | AI Chatbot | ✅ Yes | ✅ Yes | Chatbot feature |
| **OpenWeatherMap** | Weather Data | ✅ Yes | ✅ Yes | Eco tips |
| **AQI CN** | Air Quality | ✅ Yes | ⭐ Recommended | Eco tips (air quality) |
| **Carbon Interface** | Carbon Calculations | ✅ Limited | ❌ Optional | Advanced calculations |

## What Each API Provides

### OpenWeatherMap Response Example:
```json
{
  "main": {
    "temp": 25,
    "humidity": 60
  },
  "weather": [{
    "main": "Clear",
    "description": "clear sky"
  }],
  "wind": {
    "speed": 3.5
  }
}
```
**Generates tips like:**
- "Temperature is 25°C - Use natural ventilation instead of AC"
- "Clear sky - Perfect for walking or cycling!"
- "Wind speed is 3.5 m/s - Great for air-drying laundry"

### AQI CN Response Example:
```json
{
  "status": "ok",
  "data": {
    "aqi": 45,
    "city": {
      "name": "New York"
    }
  }
}
```
**Generates tips like:**
- AQI 0-50: "Excellent air quality - Go outside and be active!"
- AQI 51-100: "Good air quality - Normal outdoor activities"
- AQI 101-150: "Moderate - Sensitive groups should limit prolonged outdoor activities"
- AQI 151+: "Unhealthy - Avoid outdoor activities, use air purifiers"

## How to Get API Keys

### 1. Google Gemini (Required)
```bash
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Add to .env: GEMINI_API_KEY=your_key_here
```

### 2. OpenWeatherMap (Required)
```bash
1. Visit: https://openweathermap.org/api
2. Click "Sign Up" (free account)
3. Verify email
4. Go to API Keys section
5. Copy your default API key
6. Add to .env: OPENWEATHER_API_KEY=your_key_here
```

### 3. AQI CN (Recommended)
```bash
1. Visit: https://aqicn.org/data-platform/token/
2. Fill in the form (name, email, purpose)
3. Receive API token via email
4. Add to .env: AQICN_API_KEY=your_token_here
```

### 4. Carbon Interface (Optional)
```bash
1. Visit: https://www.carboninterface.com/
2. Sign up for free account
3. Get API key from dashboard
4. Add to .env: CARBON_INTERFACE_API_KEY=your_key_here
```

## API Limits (Free Tiers)

| API | Requests/Day | Requests/Minute | Notes |
|-----|--------------|-----------------|-------|
| Google Gemini | Generous | 60 | Good for chatbot |
| OpenWeatherMap | 1,000 | 60 | Enough for most apps |
| AQI CN | 1,000 | - | Per token |
| Carbon Interface | 200/month | - | Limited free tier |

## Recommended Setup

### Minimum (Basic Functionality):
```env
GEMINI_API_KEY=xxx          # For chatbot
OPENWEATHER_API_KEY=xxx     # For weather tips
```

### Recommended (Full Features):
```env
GEMINI_API_KEY=xxx          # For chatbot
OPENWEATHER_API_KEY=xxx     # For weather tips
AQICN_API_KEY=xxx          # For air quality tips ⭐
```

### Complete (All Features):
```env
GEMINI_API_KEY=xxx          # For chatbot
OPENWEATHER_API_KEY=xxx     # For weather tips
AQICN_API_KEY=xxx          # For air quality tips
CARBON_INTERFACE_API_KEY=xxx # For advanced calculations
```

## Testing Your APIs

### Test OpenWeatherMap:
```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY"
```

### Test AQI CN:
```bash
curl "https://api.waqi.info/feed/london/?token=YOUR_TOKEN"
```

### Test in the App:
1. Start the backend
2. Navigate to Eco Tips page
3. Allow location access
4. Check browser console for API responses

## Error Handling

The app gracefully handles missing API keys:
- ✅ **With all APIs**: Full eco tips with weather + air quality
- ⚠️ **Without AQI CN**: Weather-based tips only
- ⚠️ **Without OpenWeather**: General eco tips only
- ❌ **Without Gemini**: Chatbot won't work

## Cost Considerations

All APIs used have **free tiers** that are sufficient for:
- Development
- Testing
- Small to medium user base
- Personal projects

For production with many users, consider:
- Monitoring API usage
- Implementing caching
- Rate limiting requests
- Upgrading to paid tiers if needed

## Summary

**To answer your question**: 
- ❌ **Carbon Interface** ≠ **AQI CN** (they're different!)
- **AQI CN** = Air Quality Index (pollution levels)
- **Carbon Interface** = Carbon footprint calculations

**For your project, you want**:
- ✅ **AQI CN API** for air quality-based eco tips
- The code has been updated to use AQI CN API properly!

Get your AQI CN token here: https://aqicn.org/data-platform/token/
