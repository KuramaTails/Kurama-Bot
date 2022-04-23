const bot = require("../../bot");
const dbconnect = require("../db/dbconnect");
const dbdisconnect = require("../db/dbdisconnect");
const spamcheck = require("../spam/spamcheck");
const botsettings = require("../tutorial/create/settings/bot/botsettings");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            await spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                console.log(message.guild.twitchPlugin)
            }
        }
	}
};
