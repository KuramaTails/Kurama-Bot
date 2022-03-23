const { MessageSelectMenu, MessageActionRow, MessageEmbed, MessageButton } = require("discord.js")
const fs= require('fs');
const dbconnect = require("../db/dbconnect")
const dbdisconnnect = require("../db/dbdisconnnect")
const welcomeSchema = require("../schemas/welcome-schema")

module.exports = {
	async execute(interaction) {
        var guild = interaction.guild
        var selCategory = await guild.channels.cache.find(c => c.name == "Kurama-Zone" && c.type == "GUILD_CATEGORY")
        guild.channels.create(`welcomer-settings`,  {type: 'GUILD_TEXT',parent: selCategory.id}).then(async channel => {
            await dbconnect()
            var selectGuildWelcomer = await welcomeSchema.find({ "_id" : interaction.guild.id})
            await dbdisconnnect()
            const enabler = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Bot Kurama : Welcomer enabler")
            .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
            .addField(`Welcomer set to \`${selectGuildWelcomer[0].activeWelcome}\``,"Click button below to disable")
            const button1 = new MessageActionRow()
            if (selectGuildWelcomer[0].activeWelcome== true) {
                button1.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomerenabler`)
                    .setLabel("🔴Disable")
                    .setStyle(`SECONDARY`),
                )
            }
            else {
                button1.addComponents(
                    new MessageButton()
                    .setCustomId(`welcomerenabler`)
                    .setLabel("🟢Enable")
                    .setStyle(`SECONDARY`),
                )
            }
            await channel.send({embeds:[enabler],components:[button1]})

            if (selectGuildWelcomer[0].activeWelcome== true) {
                const channelEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Choose channel")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                .addField("Please select a text channel:this will be used by the welcomer to send messages when members join ","(Tip: Select welcome if previously created)")
                const button2 = new MessageActionRow()
                button2.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Nothing selected')
                        
                )
                var textChannels = interaction.guild.channels.cache.filter(c=> c.type=="GUILD_TEXT")
                textChannels.forEach(channel => {
                    button2.components[0].addOptions([
                        {
                            label: `${channel.name}`,
                            value: `${channel.id}`,
                        },
                    ])
                });
                await channel.send({embeds:[channelEmbed],components:[button2]})

                const backgroundEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Bot Kurama : Choose Background")
                .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
                .addField("Please select a background:this will be used by the welcomer to send messages when members join ","(Tip: Select welcome if previously created)")
                const button3 = new MessageActionRow()
                button3.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder('Nothing selected')
                        
                )
                const background = fs.readdirSync('./welcomer').filter(file => file.endsWith('.jpg'));
                console.log(background)
                background.forEach(image => {
                    button3.components[0].addOptions([
                        {
                            label: `${image}`,
                            value: `./welcomer/${image}`,
                        },
                    ])
                });
                await channel.send({embeds:[backgroundEmbed],components:[button3]})
            }
            




        })
        console.log(`Created welcomer room in ${guild.name}`)
    }
}
