const { joinVoiceChannel } = require('../node_modules/@discordjs/voice');
const {args} = require("../bot.js");
const { clientId, guildId, token } = require('../config.json');

module.exports = {
	name: "join",
	ephemeral: "false",
    command:"Join",
    desc:"Bot will join your vocal channel",
    example:"!join",
	async execute(messageCreate,bot) {
        const connection = joinVoiceChannel({
            channelId: messageCreate.member.voice.channelId,
            guildId: messageCreate.guild.id,
            adapterCreator: messageCreate.guild.voiceAdapterCreator,
        });
        console.log("Joined a voice channel!")
    }
}
