const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang,customId,plugin) {
		var twitchPlugin = plugin.twitchPlugin
        switch (customId) {
			case "addStreamer":
                var modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalAdd["title"]);
                var textInput = new TextInputComponent()
                    .setCustomId('textInput')
                    .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalAdd["label"])
                    .setStyle('SHORT');
                var firstActionRow = new MessageActionRow().addComponents(textInput);
                modal.addComponents(firstActionRow);
                await interaction.showModal(modal);
			break;
			case "deleteStreamer":
                var modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalDelete["title"]);
                var textInput = new TextInputComponent()
                    .setCustomId('textInput')
                    .setLabel(lang.get(interaction.guild.settings.lang).settings.plugins.twitchPlugin.modalDelete["label"])
                    .setStyle('SHORT');
                var firstActionRow = new MessageActionRow().addComponents(textInput);
                modal.addComponents(firstActionRow);
                await interaction.showModal(modal);
			break;
			case "selectChannel":
				var selectedChannel = interaction.guild.channels.cache.find(channel => channel.id == interaction.values[0])
                if (!selectedChannel) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= selectedChannel.name
                await interaction.message.edit({components:[updatePlaceholder]})
				twitchPlugin.channelId= interaction.values[0]
				await guildSchema.findOneAndUpdate({
					_id: interaction.guild.id,
					}, {
						$set: {
							"plugins.twitchPlugin.channelId": interaction.values[0],
						}
					},
					{
						upsert:true,
					})
			break;
		}
	}
};