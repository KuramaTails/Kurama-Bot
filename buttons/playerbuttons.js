const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
	async execute(interaction,player,countVoiceChannels,lang,category) {
        var voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) {
            return interaction.reply({
                content: "Please join a vocal channel first!",
                ephemeral: true
            })
        }
        else {
            const Embedsearch = new MessageEmbed()
            if(player.getQueue(voiceChannel)) {
                let playingSong = await player.queues.get(voiceChannel).songs[0]
                Embedsearch.setColor('#0099ff')
                .setTitle(lang.get(interaction.guild.lang).strings["optPlayerPlaying"] +`: \`${playingSong.name}\``)
                .setThumbnail(`${playingSong.thumbnail}`)
                .setURL(`${playingSong.url}`)
                .setDescription(lang.get(interaction.guild.lang).strings["optPlayerDuration"] +`: \`${playingSong.formattedDuration}\`\n`)
            }
            else {
                Embedsearch.setColor('#0099ff')
                .setTitle(lang.get(interaction.guild.lang).strings["optPlayerNotPlaying"])
                .setThumbnail(``)
                .setURL(``)
                .setDescription(``)
            }
            var secMessage = interaction.channel.messages.cache.get(interaction.message.id)
            var buttons = interaction.message.components[0]
            var buttons2 = interaction.message.components[1]
            switch (category) {
                case "join":
                    try {
                        if (countVoiceChannels<1) {
                            await player.voices.join(voiceChannel)
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerJoin"],
                                ephemeral: true
                            })
                        }
                        else {
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerNoJoin"],
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "previous":
                    try {
                        if (player.queues.collection.first().previousSongs.length) {
                            player.previous(voiceChannel);
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerPreviousSong"],
                                ephemeral: true
                            })
                        }
                        else {
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerNoPreviousSong"],
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "pause":
                    try {
                        if (!player.queues.collection.first().paused) {
                            player.pause(voiceChannel)
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerPause"],
                                ephemeral: true
                            })
                        }
                        else {
                            player.resume(voiceChannel)
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerResume"],
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "next":
                    try {
                        if (player.queues.collection.first().songs.length>1) {
                            player.skip(voiceChannel)
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerSkip"],
                                ephemeral: true
                                })
                        }
                        else {
                            player.voices.leave(voiceChannel)
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerQueueFinish"],
                                ephemeral: true
                                })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    } 
                break;
                case "leave":
                    try {
                        if (countVoiceChannels!=0) {
                            player.voices.leave(voiceChannel)
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerLeave"],
                                ephemeral: true
                            })
                        }
                        else {
                            interaction.reply({
                                content: lang.get(interaction.guild.lang).strings["optPlayerNoLeave"],
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "lesscommands":
                    buttons2.components[0].setLabel(lang.get(interaction.guild.lang).strings["optPlayerEmbedMoreCommand"]+"🔽")
                    buttons2.components[0].setCustomId("player-morecommands")
                    secMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2] });
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
                    buttons2.components[0].setLabel(lang.get(interaction.guild.lang).strings["optPlayerEmbedLessCommand"]+"🔼")
                    buttons2.components[0].setCustomId("player-lesscommands")
                    secMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2,moreButtons] });
                    interaction.deferUpdate()
                break;
                case "shuffle":
                    try {
                        player.shuffle(voiceChannel);
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayeQueueShuffle"],
                            ephemeral: true
                        })
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "loop":
                    try {
                        var queue = player.getQueue(voiceChannel)
                        var mode
                        switch(queue.repeatMode) {
                            case 0:
                                player.setRepeatMode(voiceChannel, 1)
                                mode = "DISABLED"
                                interaction.reply({
                                    content: lang.get(interaction.guild.lang).strings["optPlayerRepeatMode"]+"`" + mode + "`",
                                    ephemeral: true
                                })
                                break;
                            case 1:
                                player.setRepeatMode(voiceChannel, 2)
                                mode = "SONG"
                                interaction.reply({
                                    content: lang.get(interaction.guild.lang).strings["optPlayerRepeatMode"]+"`" + mode + "`",
                                    ephemeral: true
                                })
                                break;
                            case 2:
                                player.setRepeatMode(voiceChannel, 0)
                                var mode = "QUEUE"
                                interaction.reply({
                                    content: lang.get(interaction.guild.lang).strings["optPlayerRepeatMode"]+"`" + mode + "`",
                                    ephemeral: true
                                })
                                break;
                        }                                    
                        break;
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "queue":  
                    try {
                        var queue = player.getQueue(voiceChannel).songs
                        var i=0
                        const queueEmbed = new MessageEmbed()
                        queueEmbed.setTitle("Current Queue")
                        queue.forEach(song => {
                            if (i<25) {
                                var index = i > 0 ? i : lang.get(interaction.guild.lang).strings["optPlayerQueueCurrentlyPlaying"];
                                queueEmbed.addFields({ name: `**${index}**.` , value:  `${song.name} -`+ lang.get(interaction.guild.lang).strings["optPlayerQueueCurrentlyPlaying"] +`\`${song.formattedDuration}\``, inline: false })
                                i=i+1
                            }
                        });
                        interaction.reply({
                            embeds:[queueEmbed],
                            ephemeral: true
                        })
                    } catch (error) {
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                            ephemeral: true
                        })
                    }
                break;
                case "vol down":
                    var queue = player.getQueue(voiceChannel)
                    if (queue) {
                        var volume = queue.volume
                        player.setVolume(voiceChannel, volume-10);
                        volume = volume - 10
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerVolSet"]+"`" + volume + "`",
                            ephemeral: true
                        })
                    }
                    else { interaction.reply({
                        content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                        ephemeral: true
                    })}
                break;
                case "vol up":
                    var queue = player.getQueue(voiceChannel)
                    if (queue) {
                        var volume = queue.volume
                        player.setVolume(voiceChannel, volume+10);
                        volume = volume + 10
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).strings["optPlayerVolSet"]+"`" + volume + "`",
                            ephemeral: true
                        })
                    }
                    else { interaction.reply({
                        content: lang.get(interaction.guild.lang).strings["optPlayerQueueEmpty"],
                        ephemeral: true
                    })}
                break;
            }
        }
	}
};