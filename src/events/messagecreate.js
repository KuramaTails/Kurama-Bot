const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                var streamingInfo = await bot.twitch.getStreams({ channel: "mangaka96" })
                if (streamingInfo.data[0]) {
                    var thumbnail = streamingInfo.data[0].thumbnail_url.replace("-{width}x{height}","")
                    const streamingEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(streamingInfo.data[0].user_name+" is live right now")
                    .setURL("https://twitch.tv/"+streamingInfo.data[0].user_login)
                    .setDescription(streamingInfo.data[0].title)
                    .setImage(thumbnail)
                    message.channel.send({embeds:[streamingEmbed]})
                }
            }
        }
	}
};
