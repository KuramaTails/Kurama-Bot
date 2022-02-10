require('dotenv').config();

const {Client} = require('discord.js');
const bot = new Client();

bot.login(process.env.DISCORDJS_BOT_TOKEN);