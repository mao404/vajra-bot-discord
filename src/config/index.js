const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configuration of the api
module.exports = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.SERVER_ID,
    adminId: process.env.DISCORD_USER_ID,
  },
  openWeather: {
    apiKey: process.env.OPENWEATHER_KEY,
  },
  tenor: {
    apiKey: process.env.TENOR_KEY,
  },
};
