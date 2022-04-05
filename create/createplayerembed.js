const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
	async execute(guild,selectedChannelId,lang) {
        var selectedChannel = await guild.channels.resolve(selectedChannelId)
        const Embedsearch = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(lang.get(guild.lang).commands.player.embeds.errors["playing"])
        .setThumbnail(``)
        .setURL(``)
        .setDescription(``)
        const buttons1 = new MessageActionRow()
        const moreButton = new MessageActionRow()
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
            .setLabel(lang.get(guild.lang).buttons.buttons["btnMoreCommand"]+"🔽")
            .setStyle(`SECONDARY`),);
        selectedChannel.send({embeds: [Embedsearch],components:[buttons1,moreButton]})
    }
};