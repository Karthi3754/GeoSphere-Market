/**
 * Google Maps configuration
 * 
 * To set up:
 * 1. Get API key from Google Cloud Console
 * 2. Create .env file in project root
 * 3. Add: VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
 * 4. Restart development server
 */
const config = {
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
};

if (!config.googleMapsApiKey) {
  console.error('Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in .env file');
}

export default config;
