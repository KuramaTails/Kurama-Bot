const bot = require("../../bot");
const createbotsettings = require("../tutorial/create/settings/createbotsettings");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            if(message.content.startsWith(bot.prefix)){
                createbotsettings.execute(message,bot.lang)
            }
        }
	}
};
