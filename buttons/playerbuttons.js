const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
	async execute(interaction,player,countVoiceChannels) {
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
                .setTitle(`Playing: \`${playingSong.name}\``)
                .setThumbnail(`${playingSong.thumbnail}`)
                .setURL(`${playingSong.url}`)
                .setDescription(`Duration: \`${playingSong.formattedDuration}\`\n`)
            }
            else {
                Embedsearch.setColor('#0099ff')
                .setTitle(`No songs playing right now`)
                .setThumbnail(``)
                .setURL(``)
                .setDescription(``)
            }
            var secMessage = interaction.channel.messages.cache.get(interaction.message.id)
            var buttons = interaction.message.components[0]
            var buttons2 = interaction.message.components[1]
            switch (interaction.customId) {
                case "player-join":
                    try {
                        if (countVoiceChannels<1) {
                            player.voices.join(voiceChannel)
                            interaction.reply({
                                content: "Player joined your voice Channel",
                                ephemeral: true
                            })
                        }
                        else {
                            interaction.reply({
                                content: "Already joined",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-previous":
                    try {
                        if (player.queues.collection.first().previousSongs.length) {
                            player.previous(voiceChannel);
                            interaction.reply({
                                content: "Playing previous song",
                                ephemeral: true
                            })
                        }
                        else {
                            interaction.reply({
                                content: "No previous songs in queue",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-pause":
                    try {
                        if (!player.queues.collection.first().paused) {
                            player.pause(voiceChannel)
                            interaction.reply({
                                content: "Player paused",
                                ephemeral: true
                            })
                        }
                        else {
                            player.resume(voiceChannel)
                            interaction.reply({
                                content: "Player resumed",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-next":
                    try {
                        if (player.queues.collection.first().songs.length>1) {
                            player.skip(voiceChannel)
                            interaction.reply({
                                content: "Song skipped",
                                ephemeral: true
                                })
                        }
                        else {
                            player.voices.leave(voiceChannel)
                            interaction.reply({
                                content: "Leaved the voice channel, no more songs in queue",
                                ephemeral: true
                                })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    } 
                break;
                case "player-leave":
                    try {
                        if (countVoiceChannels!=0) {
                            player.voices.leave(voiceChannel)
                            interaction.reply({
                                content: "Leaving your voice Channel",
                                ephemeral: true
                            })
                        }
                        else {
                            interaction.reply({
                                content: "Already leaved",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-lesscommands":
                    buttons2.components[0].setLabel("More commands 🔽")
                    buttons2.components[0].setCustomId("player-morecommands")
                    secMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2] });
                    interaction.deferUpdate()
                break;
                case "player-morecommands":
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
                    buttons2.components[0].setLabel("Less commands 🔼")
                    buttons2.components[0].setCustomId("player-lesscommands")
                    secMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2,moreButtons] });
                    interaction.deferUpdate()
                break;
                case "player-shuffle":
                    try {
                        player.shuffle(voiceChannel);
                        interaction.reply({
                            content: "Queue shuffled",
                            ephemeral: true
                        })
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-loop":
                    try {
                        var queue = player.getQueue(voiceChannel)
                        var mode
                        switch(queue.repeatMode) {
                            case 0:
                                player.setRepeatMode(voiceChannel, 1)
                                mode = "DISABLED"
                                interaction.reply({
                                    content: "Set repeat mode to `" + mode + "`",
                                    ephemeral: true
                                })
                                break;
                            case 1:
                                player.setRepeatMode(voiceChannel, 2)
                                mode = "SONG"
                                interaction.reply({
                                    content: "Set repeat mode to `" + mode + "`",
                                    ephemeral: true
                                })
                                break;
                            case 2:
                                player.setRepeatMode(voiceChannel, 0)
                                var mode = "QUEUE"
                                interaction.reply({
                                    content: "Set repeat mode to `" + mode + "`",
                                    ephemeral: true
                                })
                                break;
                        }                                    
                        break;
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-queue":
                    try {
                        interaction.reply({
                            content: `Current queue:\n${player.queues.collection.first().songs
                                .map((song, id) =>	`**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``)
                                .slice(0, 10)
                                .join('\n')}`,
                            ephemeral: true
                        })
                    } catch (error) {
                        interaction.reply({
                            content: "No songs in queue",
                            ephemeral: true
                        })
                    }
                break;
                case "player-vol down":
                    var queue = player.getQueue(voiceChannel)
                    if (queue) {
                        var volume = queue.volume
                        player.setVolume(voiceChannel, volume-10);
                        volume = volume - 10
                        interaction.reply({
                            content: "Set volume to `" + volume + "`",
                            ephemeral: true
                        })
                    }
                    else { interaction.reply({
                        content: "No songs in queue",
                        ephemeral: true
                    })}
                break;
                case "player-vol up":
                    var queue = player.getQueue(voiceChannel)
                    if (queue) {
                        var volume = queue.volume
                        player.setVolume(voiceChannel, volume+10);
                        volume = volume + 10
                        interaction.reply({
                            content: "Set volume to `" + volume+ "`",
                            ephemeral: true
                        })
                    }
                    else { interaction.reply({
                        content: "No songs in queue",
                        ephemeral: true
                    })}
                break;
            }
        }
	}
};