const { getVoiceConnection } = require("@discordjs/voice");
const {args} = require("../bot.js");
const { clientId, guildId, token } = require('../config.json');

module.exports = {
	name: "leave",
	ephemeral: "false",
    command:"Leave",
    desc:"Bot will leave your vocal channel",
    example:"!leave",
	async execute(messageCreate,bot) {
        const connection = getVoiceConnection(messageCreate.guild.id)

        if(!connection) return messageCreate.reply("I'm not in a voice channel!")

        connection.destroy()

        console.log('Disconnected from voice!');
    }
}
