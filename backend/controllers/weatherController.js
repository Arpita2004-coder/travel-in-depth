import Destination from "../models/Destination.js";

// Mapping Open-Meteo WMO weather codes to human-readable conditions & icons
const WMO_CODE_MAP = {
  0: { label: "Clear Sky", icon: "☀️", condition: "Clear" },
  1: { label: "Mainly Clear", icon: "🌤️", condition: "Clear" },
  2: { label: "Partly Cloudy", icon: "⛅", condition: "Cloudy" },
  3: { label: "Overcast", icon: "☁️", condition: "Overcast" },
  45: { label: "Foggy", icon: "🌫️", condition: "Fog" },
  48: { label: "Depositing Rime Fog", icon: "🌫️", condition: "Fog" },
  51: { label: "Light Drizzle", icon: "🌦️", condition: "Drizzle" },
  53: { label: "Moderate Drizzle", icon: "🌦️", condition: "Drizzle" },
  55: { label: "Dense Drizzle", icon: "🌧️", condition: "Drizzle" },
  61: { label: "Slight Rain", icon: "🌦️", condition: "Rain" },
  63: { label: "Moderate Rain", icon: "🌧️", condition: "Rain" },
  65: { label: "Heavy Rain", icon: "⛈️", condition: "Rain" },
  71: { label: "Slight Snow", icon: "🌨️", condition: "Snow" },
  73: { label: "Moderate Snow", icon: "❄️", condition: "Snow" },
  75: { label: "Heavy Snow", icon: "❄️", condition: "Snow" },
  80: { label: "Rain Showers", icon: "🌦️", condition: "Showers" },
  81: { label: "Moderate Showers", icon: "🌧️", condition: "Showers" },
  82: { label: "Violent Showers", icon: "⛈️", condition: "Showers" },
  95: { label: "Thunderstorm", icon: "⚡", condition: "Thunderstorm" },
  96: { label: "Thunderstorm with Hail", icon: "⛈️", condition: "Thunderstorm" },
  99: { label: "Severe Thunderstorm", icon: "⛈️", condition: "Thunderstorm" },
};

/**
 * Controller: GET /api/weather
 * Queries real-time weather & 5-day forecast using Open-Meteo API
 * Supports params: ?slug=jaipur OR ?lat=26.9124&lng=75.7873
 */
export const getWeather = async (req, res) => {
  try {
    let { slug, lat, lng } = req.query;
    let cityName = slug || "Current Location";

    if (slug) {
      const dest = await Destination.findOne({ slug: slug.toLowerCase() });
      if (dest) {
        lat = dest.lat;
        lng = dest.lng;
        cityName = dest.name;
      }
    }

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Latitude (lat) & Longitude (lng) or valid destination slug are required",
      });
    }

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&timezone=auto&forecast_days=5`;

    const weatherResponse = await fetch(openMeteoUrl);
    if (!weatherResponse.ok) {
      return res.status(502).json({ message: "Weather service temporarily unavailable" });
    }

    const data = await weatherResponse.json();
    const current = data.current || {};
    const daily = data.daily || {};

    const currentWeatherCode = current.weather_code ?? 0;
    const weatherInfo = WMO_CODE_MAP[currentWeatherCode] || { label: "Clear", icon: "☀️", condition: "Clear" };

    // Format 5-day daily forecast
    const forecast = (daily.time || []).map((dateStr, idx) => {
      const code = daily.weather_code?.[idx] ?? 0;
      const info = WMO_CODE_MAP[code] || { label: "Clear", icon: "☀️" };
      const dateObj = new Date(dateStr);
      const dayName = dateObj.toLocaleDateString("en-IN", { weekday: "short" });

      return {
        date: dateStr,
        day: dayName,
        maxTemp: Math.round(daily.temperature_2m_max?.[idx] ?? 0),
        minTemp: Math.round(daily.temperature_2m_min?.[idx] ?? 0),
        weatherCode: code,
        label: info.label,
        icon: info.icon,
        uvIndex: daily.uv_index_max?.[idx] ?? 0,
      };
    });

    res.status(200).json({
      location: {
        city: cityName,
        latitude: lat,
        longitude: lng,
        timezone: data.timezone,
      },
      current: {
        temperature: Math.round(current.temperature_2m ?? 0),
        apparentTemperature: Math.round(current.apparent_temperature ?? 0),
        humidity: current.relative_humidity_2m ?? 0,
        precipitation: current.precipitation ?? 0,
        windSpeed: Math.round(current.wind_speed_10m ?? 0),
        weatherCode: currentWeatherCode,
        condition: weatherInfo.condition,
        label: weatherInfo.label,
        icon: weatherInfo.icon,
        isDay: current.is_day === 1,
      },
      forecast,
    });
  } catch (err) {
    console.error("Weather query failed:", err);
    res.status(500).json({ message: "Failed to fetch weather data", error: err.message });
  }
};
