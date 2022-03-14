const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
	async execute(guild) {
        setTimeout( async() => {
            var listchannels = await guild.channels.fetch()
            var keyschannels = Array.from(listchannels.keys())
            for (let i = 0; i < keyschannels.length; i++) {
                switch (listchannels.get(keyschannels[i]).name) {
                    case `player-room`:
                        var textchannel = listchannels.get(keyschannels[i])
                        break;
                }	
            }
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
            textchannel.send({embeds: [Embedsearch],components:[buttons1,moreButton]})
        }, 10*1000);
    }
};