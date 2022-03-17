const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
	async execute(guild) {
        var listChannels = await guild.channels.fetch()
        let selChannel = await listChannels.find(channel => channel.name.includes("player-room"))
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
        selChannel.send({embeds: [Embedsearch],components:[buttons1,moreButton]})
    }
};