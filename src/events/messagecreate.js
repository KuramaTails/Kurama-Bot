const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                
            }
        }
	}
};
