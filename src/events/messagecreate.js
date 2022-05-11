const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");
const guildmemberadd = require("../events/member/guildmemberadd");
module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            await spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                console.log(message.guild.settings)
                await guildmemberadd.execute(message.member)
            }
        }
	}
};
