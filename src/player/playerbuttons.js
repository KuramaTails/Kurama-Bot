const { MessageButton, MessageActionRow } = require("discord.js");
const join = require("./commands/join")
const previous = require("./commands/previous")
const pause = require("./commands/pause")
const resume = require("./commands/resume")
const next = require("./commands/skip")
const leave = require("./commands/leave")
const shuffle = require("./commands/shuffle")
const loop = require("./commands/loop")
const queue = require("./commands/queue")
const volume = require("./commands/volume")
module.exports = {
	async execute(interaction,player,lang,category,playerUser) {
        var voiceChannel = interaction.member.voice.channel
        await interaction.deferUpdate()
        var secMessage = interaction.channel.messages.cache.get(interaction.message.id)
        var search = interaction.message.components[0]
        var buttons = interaction.message.components[1]
        var buttons2 = interaction.message.components[2]
        switch (category) {
            case "join":
                join.execute(interaction,player,lang,voiceChannel)
            return
            case "leave":
                leave.execute(interaction,player,lang,voiceChannel)
            return
            case "lesscommands":
                buttons2.components[0].setLabel(lang.get(interaction.guild.settings.lang).player.buttons["btnMoreCommand"]+"🔽")
                buttons2.components[0].setCustomId("player-morecommands")
                secMessage.edit({components: [search,buttons,buttons2] });
            return
            case "morecommands":
                var moreButtonscommands = [
                {name:"Shuffle",emoji:"🔀",style:"SECONDARY"},
                {name:"Loop",emoji:"🔁",style:"SECONDARY"},
                {name:"Queue",emoji:"🔢",style:"SECONDARY"},
                {name:"Vol Down",emoji:"🔉",style:"SECONDARY"},
                {name:"Vol Up",emoji:"🔊",style:"SECONDARY"},
                ]
                const moreButtons = new MessageActionRow()
                for (let i = 0; i < moreButtonscommands.length; i++) {
                    var customId = moreButtonscommands[i].name.toLowerCase()
                    moreButtons.addComponents(
                        new MessageButton()
                        .setCustomId(`player-${customId}`)
                        .setLabel(`${moreButtonscommands[i].emoji}`)
                        .setStyle(`${moreButtonscommands[i].style}`),
                    ); 
                }
                buttons2.components[0].setLabel(lang.get(interaction.guild.settings.lang).player.buttons["btnLessCommand"]+"🔼")
                buttons2.components[0].setCustomId("player-lesscommands")
                secMessage.edit({components: [search,buttons,buttons2,moreButtons]});
            return
        }
        if (!player.getQueue(voiceChannel)) return interaction.followUp({content: lang.get(interaction.guild.settings.lang).player.commands.errors["queue"],ephemeral: true})
        switch (category) {
            case "previous":
                previous.execute(interaction,player,lang,voiceChannel)
            break;
            case "pause":
                !player.queues.collection.first().paused? pause.execute(interaction,player,lang,voiceChannel) : resume.execute(interaction,player,lang,voiceChannel)
            break;
            case "next":
                next.execute(interaction,player,lang,voiceChannel,playerUser)
            break;
            case "shuffle":
                shuffle.execute(interaction,player,lang,voiceChannel)
            break;
            case "loop":
                loop.execute(interaction,player,lang,voiceChannel)
            break;
            case "queue":  
                queue.execute(interaction,player,lang,voiceChannel)
            break;
            case "vol down":
                volume.execute(interaction,player,lang,voiceChannel,false)
            break;
            case "vol up":
                volume.execute(interaction,player,lang,voiceChannel,true)
            break;
        }
	}
};