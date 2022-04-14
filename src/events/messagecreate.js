const bot = require("../../bot");
const createwelcomezone = require("../tutorial/create/createwelcomezone");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            if(message.content.startsWith(bot.prefix)){
                createwelcomezone.execute(message,bot.lang)
            }
        }
	}
};
