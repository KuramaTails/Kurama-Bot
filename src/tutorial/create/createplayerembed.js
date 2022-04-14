const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
	async execute(interaction,selectedChannelId,lang) {
        var selectedChannel = await interaction.guild.channels.cache.find(channel => channel.id == selectedChannelId)
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(lang.get(interaction.guild.lang).commands.player.embeds.errors["playing"])
        .setThumbnail(``)
        .setURL(``)
        .setDescription(``)
        const searchButton = new MessageActionRow()
        const buttons1 = new MessageActionRow()
        const moreButton = new MessageActionRow()
        searchButton.addComponents(
            new MessageButton()
            .setCustomId(`player-search`)
            .setLabel(lang.get(interaction.guild.lang).buttons.player.embeds["search"])
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
            .setLabel(lang.get(interaction.guild.lang).buttons.buttons["btnMoreCommand"]+"🔽")
            .setStyle(`SECONDARY`),);
        selectedChannel.send({embeds: [Embedsearch],components:[searchButton,buttons1,moreButton]})
    }
};