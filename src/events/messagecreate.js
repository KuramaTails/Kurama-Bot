const bot = require("../../bot");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            if(message.content.startsWith(bot.prefix)){
            }
        }
	}
};
