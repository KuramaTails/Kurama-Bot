const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
	async execute(interaction,lang,channelId) {
        var selectedChannel = interaction.guild.channels.resolve(channelId)
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(lang.get(interaction.guild.settings.lang).player.embeds.errors["playing"])
        .setThumbnail(``)
        .setURL(``)
        .setDescription(``)
        const searchButton = new MessageActionRow()
        const buttons1 = new MessageActionRow()
        const moreButton = new MessageActionRow()
        searchButton.addComponents(
            new MessageButton()
            .setCustomId(`player-search`)
            .setLabel(lang.get(interaction.guild.settings.lang).player.buttons["search"])
            .setStyle(`SECONDARY`),);
        buttons1.addComponents(
            new MessageButton()
            .setCustomId(`player-join`)
            .setLabel("✅")
            .setStyle(`SUCCESS`),
            new MessageButton()
            .setCustomId(`player-previous`)
            .setLabel(`⏮`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`player-pause`)
            .setLabel(`⏯`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`player-next`)
            .setLabel(`⏭`)
            .setStyle(`SECONDARY`),
            new MessageButton()
            .setCustomId(`player-leave`)
            .setLabel("❌")
            .setStyle(`DANGER`),
        );
        moreButton.addComponents(
            new MessageButton()
            .setCustomId(`player-morecommands`)
            .setLabel(lang.get(interaction.guild.settings.lang).player.buttons["btnMoreCommand"]+"🔽")
            .setStyle(`SECONDARY`),);
        selectedChannel.send({embeds: [Embedsearch],components:[searchButton,buttons1,moreButton]})
    }
};