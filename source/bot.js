
const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');
const { token } = require('../config.json');



const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

dotenv.config();


bot.once('ready', () => {
    console.log('Ready!');
});
bot.login(token);