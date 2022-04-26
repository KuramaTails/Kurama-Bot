const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");
const botsettings = require("../tutorial/create/settings/botsettings")
module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            await spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                botsettings.execute(message,bot.lang)
            }
        }
	}
};
