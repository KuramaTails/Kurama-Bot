const { MessageEmbed , MessageActionRow , MessageButton} = require("discord.js");
var commands = [
    {name:"Join",emoji:"✅",style:"SUCCESS"}, 
    {name:"Previous",emoji:"⏮",style:"SECONDARY"},
    {name:"(Un)Pause",emoji:"⏯",style:"SECONDARY"},
    {name:"Next",emoji:"⏭",style:"SECONDARY"},
    {name:"Leave",emoji:"❌",style:"DANGER"},
    {name:"More commands 🔽",style:"SECONDARY"},
    
	
]
module.exports = {
	async execute(guild,player) {
        var listchannels = await guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        for (let i = 0; i < keyschannels.length; i++) {
            switch (listchannels.get(keyschannels[i]).name) {
                case `player-room`:
                    var textchannel = listchannels.get(keyschannels[i])
                    break;
            }	
        }
        guild.channels.fetch(textchannel.id).then(async channel => {
            var foundMessage
            let playlist = player.queues.collection.first().songs;
            const Embedsearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Playing: \`${playlist[0].name}\``)
            .setThumbnail(`${playlist[0].thumbnail}`)
            .setURL(`${playlist[0].url}`)
            .setDescription(`Duration: \`${playlist[0].formattedDuration}\`\n`)
            const buttons = new MessageActionRow()
            const buttons2 = new MessageActionRow()

            for (let i = 0; i < commands.length; i++) {
                if (buttons.components.length<5) {
                    buttons.addComponents(
                        new MessageButton()
                        .setCustomId(`${commands[i].name}`)
                        .setLabel(`${commands[i].emoji}`)
                        .setStyle(`${commands[i].style}`),
                    ); 
                }
                else {
                    if (buttons2.components.length<1)
                    buttons2.addComponents(
                        new MessageButton()
                        .setCustomId(`${commands[i].name}`)
                        .setLabel(`${commands[i].name}`)
                        .setStyle(`${commands[i].style}`),
                    ); 
                }
                
            }
            var allmessages = await channel.messages.fetch()
            var keysmessages = Array.from(allmessages.keys())
            for (let i = 0; i < keysmessages.length; i++) {
                if (allmessages.get(keysmessages[i]).embeds.length > 0) {
                    foundMessage = await allmessages.get(keysmessages[i])
                }
            }	
            if (foundMessage) {
                foundMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2] });
            }
            else {
                channel.send ({embeds: [Embedsearch],components: [buttons,buttons2] })
            }
        })
    }
};