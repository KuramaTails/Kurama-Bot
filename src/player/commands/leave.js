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
		var joinedChannnels = Array.from(player.voices.collection.keys())
		var stringerr = lang.get(settings.lang).player.commands.errors["leave"]
		var stringjoin = lang.get(settings.lang).player.commands["leave"]
		var found = false
		joinedChannnels.forEach(channel=> {found = channel.id=voiceChannel? true : false})
		if (found!=true) return interaction.followUp({content: stringerr,ephemeral: true})
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
		interaction.followUp({content: stringjoin,ephemeral: true})
		player.voices.leave(voiceChannel)
	},
};