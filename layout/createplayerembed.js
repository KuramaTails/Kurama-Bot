const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
	async execute(guild,selectedChannelId) {
        var selectedChannel = await guild.channels.resolve(selectedChannelId)
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