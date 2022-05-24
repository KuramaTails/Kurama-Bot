const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
module.exports = {
	name: "join",
    command:"join",
    desc:'Bot will join your voice channel!',
    example:"/player join",
	async execute(interaction,player,lang,voiceChannel) {
		var stringErr = lang.get(interaction.guild.settings.lang).player.commands.errors["join"]
		var stringJoin = lang.get(interaction.guild.settings.lang).player.commands["join"]
		var connection = getVoiceConnection(voiceChannel.guild.id);
		if (connection) return interaction.followUp({content: stringErr,ephemeral: true}) 
		interaction.followUp({content: stringJoin,ephemeral: true})
		joinVoiceChannel({channelId: voiceChannel.id,guildId: voiceChannel.guild.id,adapterCreator: voiceChannel.guild.voiceAdapterCreator})
	}
};