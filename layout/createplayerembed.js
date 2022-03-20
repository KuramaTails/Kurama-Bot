const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const channelsSchema = require("../schemas/channels-schema");
module.exports = {
	async execute(guild) {
        var selectGuild = await channelsSchema.find({ "_id" : guild.id})
		var keysChannels = Array.from(selectGuild[0].channels.keys())
		var listTextChannels = []
		for (let i = 0; i < keysChannels.length; i++) {
			if (selectGuild[0].channels.get(keysChannels[i]).name == "player-room") {
				listTextChannels.push(keysChannels[i])
			}
		}
        var selectedChannel = await guild.channels.resolve(listTextChannels[0])
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`No songs playing right now`)
        .setThumbnail(``)
        .setURL(``)
        .setDescription(``)
        const buttons1 = new MessageActionRow()
        const moreButton = new MessageActionRow()
        buttons1.addComponents(
            new MessageButton()
            .setCustomId(`Join`)
            .setLabel("✅")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`Previous`)
            .setLabel(`⏮`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`(Un)Pause`)
            .setLabel(`⏯`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`Next`)
            .setLabel(`⏭`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`Leave`)
            .setLabel("❌")
            .setStyle(`DANGER`),
        );
        moreButton.addComponents(
            new MessageButton()
            .setCustomId(`More commands 🔽`)
            .setLabel("More commands 🔽")
            .setStyle(`SECONDARY`),);
        selectedChannel.send({embeds: [Embedsearch],components:[buttons1,moreButton]})
    }
};