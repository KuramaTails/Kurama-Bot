const bot = require("../../bot");
const starttutorial = require("../tutorial/starttutorial");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            if(message.content.startsWith(bot.prefix)){
                await starttutorial.execute(message.guild,bot.lang)
            }
        }
	}
};
