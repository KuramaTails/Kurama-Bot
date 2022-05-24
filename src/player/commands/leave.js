const { getVoiceConnection } = require("@discordjs/voice");
const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	name: "leave",
    command:"leave",
    desc:'Bot will leave your voice channel!',
    example:"/player leave",
	async execute(interaction,player,lang,voiceChannel) {
		var settings = interaction.guild.settings
		var stringErr = lang.get(settings.lang).player.commands.errors["leave"]
		var stringLeave = lang.get(settings.lang).player.commands["leave"]
		var connection = getVoiceConnection(voiceChannel.guild.id);
		if (!connection) return interaction.followUp({content: stringErr,ephemeral: true})
		interaction.followUp({content: stringLeave,ephemeral: true})
		await connection.destroy();
		var vol = player.getQueue(voiceChannel)? player.getQueue(voiceChannel).volume : 50
		settings.plugins.playerPlugin.volume = vol
		await dbconnect()
		await guildSchema.findOneAndUpdate({
			_id: interaction.guild.id,
		}, {
			$set: {
				"plugins.playerPlugin.volume":  vol,
			}
		},
		{
			upsert:true,
		})
		await dbdisconnect()
	},
};