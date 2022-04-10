const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
	async execute(interaction,player,countVoiceChannels,lang,category,playerUser) {
        var voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.reply({
                content: lang.get(interaction.guild.lang).buttons.player.commands.errors["memberJoin"],
                ephemeral: true
            })
        }
        else {
            const Embedsearch = new MessageEmbed()
            if (!player.getQueue(voiceChannel)) {
                Embedsearch.setColor('#0099ff')
                .setTitle(lang.get(interaction.guild.lang).buttons.player.embeds.errors["playing"])
                .setThumbnail(``)
                .setURL(``)
                .setDescription(``)
                await interaction.message.edit({embeds:[Embedsearch]})
                await interaction.reply({
                    content: lang.get(interaction.guild.lang).buttons.player.commands.errors["queue"],
                    ephemeral: true
                })
                return
            }
            let playingSong = await player.queues.get(voiceChannel).songs[0]
            Embedsearch.setColor('#0099ff')
            .setTitle(lang.get(interaction.guild.lang).buttons.player.embeds["playing"] +`: \`${playingSong.name}\``)
            .setThumbnail(`${playingSong.thumbnail}`)
            .setURL(`${playingSong.url}`)
            .setDescription(lang.get(interaction.guild.lang).buttons.player.embeds["duration"] +`: \`${playingSong.formattedDuration}\`\n`)
            var secMessage = interaction.channel.messages.cache.get(interaction.message.id)
            var search = interaction.message.components[0]
            var buttons = interaction.message.components[1]
            var buttons2 = interaction.message.components[2]
            switch (category) {
                case "join":
                    if (countVoiceChannels>1) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.commands.errors["join"],
                            ephemeral: true
                        })    
                    }
                    await player.voices.join(voiceChannel)
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.commands["join"],
                            ephemeral: true
                        })
                break;
                case "previous":
                    if (!player.queues.collection.first().previousSongs.length) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.commands.errors["previousSong"],
                            ephemeral: true
                        }) 
                    }
                    player.previous(voiceChannel);
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.commands["previousSong"],
                        ephemeral: true
                    })
                break;
                case "pause":
                    if (player.queues.collection.first().paused) {
                        player.resume(voiceChannel)
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.states["optPlayerResume"],
                            ephemeral: true
                        })
                    }
                    player.pause(voiceChannel)
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.states["optPlayerPause"],
                        ephemeral: true
                    })
                break;
                case "next":
                    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                        var countMembers = Array.from(voiceChannel.members.keys())
                        if (!playerUser.has(interaction.guild.id)) {
                            playerUser.set(interaction.guild.id,[interaction.user.id]);
                        }
                        else {
                            if (!playerUser.get(interaction.guild.id).find(id =>id==interaction.user.id)) {
                                playerUser.get(interaction.guild.id).push(interaction.user.id)
                            }
                        }
                        if (playerUser.get(interaction.guild.id).length<countMembers.length/2) {
                            var memberLeft= countMembers.length/2-playerUser.get(interaction.guild.id).length
                            var string = lang.get(modal.guild.lang).commands.player.commands.errors["skip"]
                            let result = string.replace("${memberLeft}",`${memberLeft}`);
                            return interaction.reply({
                                content: result ,
                                ephemeral: true
                                })  
                        }
                    }
                    if (player.queues.collection.first().songs.length>1) {
                        player.skip(voiceChannel)
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.commands["skip"],
                            ephemeral: true
                            })
                    }
                    else {
                        player.voices.leave(voiceChannel)
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.commands.errors["skip"],
                            ephemeral: true
                            })
                    }
                break;
                case "leave":
                    if (countVoiceChannels=0) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).buttons.player.commands.errors["leave"],
                            ephemeral: true
                        })
                    }
                    player.voices.leave(voiceChannel)
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.commands["leave"],
                        ephemeral: true
                    })
                break;
                case "lesscommands":
                    buttons2.components[0].setLabel(lang.get(interaction.guild.lang).buttons.buttons["btnMoreCommand"]+"🔽")
                    buttons2.components[0].setCustomId("player-morecommands")
                    secMessage.edit({embeds: [Embedsearch],components: [search,buttons,buttons2] });
                    interaction.deferUpdate()
                break;
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
                    buttons2.components[0].setLabel(lang.get(interaction.guild.lang).buttons.buttons["btnLessCommand"]+"🔼")
                    buttons2.components[0].setCustomId("player-lesscommands")
                    secMessage.edit({embeds: [Embedsearch],components: [search,buttons,buttons2,moreButtons] });
                    interaction.deferUpdate()
                break;
                case "shuffle":
                    player.shuffle(voiceChannel);
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.commands["shuffle"],
                        ephemeral: true
                    })
                break;
                case "loop":
                    var mode
                    switch(player.getQueue(voiceChannel).repeatMode) {
                        case 0:
                            player.setRepeatMode(voiceChannel, 1)
                            mode = "DISABLED"
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).buttons.player.settings["repeatMode"]+"`" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 1:
                            player.setRepeatMode(voiceChannel, 2)
                            mode = "SONG"
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).buttons.player.settings["repeatMode"]+"`" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 2:
                            player.setRepeatMode(voiceChannel, 0)
                            var mode = "QUEUE"
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).buttons.player.settings["repeatMode"]+"`" + mode + "`",
                                ephemeral: true
                            })
                            break;
                    }   
                break;
                case "queue":  
                    var i=0
                    const queueEmbed = new MessageEmbed()
                    queueEmbed.setTitle(lang.get(interaction.guild.lang).buttons.player.embeds["queue"])
                    player.getQueue(voiceChannel).songs.forEach(song => {
                        if (i<25) {
                            var index = i > 0 ? i : lang.get(interaction.guild.lang).buttons.player.embeds["currentlyPlaying"];
                            queueEmbed.addFields({ name: `**${index}**.` , value:  `${song.name} -`+ lang.get(interaction.guild.lang).strings["optPlayerQueueCurrentlyPlaying"] +`\`${song.formattedDuration}\``, inline: false })
                            i=i+1
                        }
                    });
                    interaction.reply({
                        embeds:[queueEmbed],
                        ephemeral: true
                    })
                break;
                case "vol down":
                    var volume = player.getQueue(voiceChannel).volume
                    player.setVolume(voiceChannel, volume-10);
                    volume = volume - 10
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.settings["volSet"]+"`" + volume + "`",
                        ephemeral: true
                    })
                break;
                case "vol up":
                    var volume = player.getQueue(voiceChannel).volume
                    player.setVolume(voiceChannel, volume+10);
                    volume = volume + 10
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.settings["volSet"]+"`" + volume + "`",
                        ephemeral: true
                    })
                break;
            }
        }
	}
};