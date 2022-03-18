const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
	async execute(interaction,cooldownUser,player,selChannel,countVoiceChannels) {
        try {
            var voiceChannel = interaction.member.voice.channel
            if(!voiceChannel) {
                return interaction.reply({
                    content: "Please join a vocal channel first!",
                    ephemeral: true
                })
            }
            const Embedsearch = new MessageEmbed()
            var playerCommandName = interaction.customId
            if (voiceChannel) {
                if(player.getQueue(voiceChannel)) {
                    var queue = await player.queues.get(voiceChannel)
                    let playingSong = queue.songs[0]
                    Embedsearch.setColor('#0099ff')
                    .setTitle(`Playing: \`${playingSong.name}\``)
                    .setThumbnail(`${playingSong.thumbnail}`)
                    .setURL(`${playingSong.url}`)
                    .setDescription(`Duration: \`${playingSong.formattedDuration}\`\n`)
                    var secMessage
                    var buttons = interaction.message.components[0]
                    var buttons2 = interaction.message.components[1]
                    switch (playerCommandName) {
                        case "Join":
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
                                console.log(error)
                            }
                        break;
                        case "Previous":
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
                                console.log(error)
                            }
                        break;
                        case "(Un)Pause":
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
                                console.log(error)
                            }
                        break;
                        case "Next":
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
                                console.log(error)
                            } 
                        break;
                        case "Leave":
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
                                console.log(error)
                            }
                        break;
                        case "Less commands 🔼":
                            buttons2.components[0].setLabel("More commands 🔽")
                            buttons2.components[0].setCustomId("More commands 🔽")
                            secMessage = await selChannel.messages.cache.get(interaction.message.id)
                            secMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2] });
                            interaction.deferUpdate()
                        break;
                        case "More commands 🔽":
                            var moreButtonscommands = [
                            {name:"Shuffle",emoji:"🔀",style:"SECONDARY"},
                            {name:"Loop",emoji:"🔁",style:"SECONDARY"},
                            {name:"Queue",emoji:"🔢",style:"SECONDARY"},
                            {name:"Vol Down",emoji:"🔉",style:"SECONDARY"},
                            {name:"Vol Up",emoji:"🔊",style:"SECONDARY"},
                            ]
                            const moreButtons = new MessageActionRow()
                            for (let i = 0; i < moreButtonscommands.length; i++) {
                                moreButtons.addComponents(
                                    new MessageButton()
                                    .setCustomId(`${moreButtonscommands[i].name}`)
                                    .setLabel(`${moreButtonscommands[i].emoji}`)
                                    .setStyle(`${moreButtonscommands[i].style}`),
                                ); 
                            }
                            buttons2.components[0].setLabel("Less commands 🔼")
                            buttons2.components[0].setCustomId("Less commands 🔼")
                            secMessage = await selChannel.messages.cache.get(interaction.message.id)
                            secMessage.edit({embeds: [Embedsearch],components: [buttons,buttons2,moreButtons] });
                            interaction.deferUpdate()
                        break;
                        case "Shuffle":
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
                                console.log(error)
                            }
                        break;
                        case "Loop":
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
                                console.log(error)
                            }
                        break;
                        case "Queue":
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
                                console.log(error)
                            }
                        break;
                        case "Vol Down":
                            try {
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
                            } catch (error) {
                                console.log(error)
                            }
                        break;
                        case "Vol Up":
                            try {
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
                            } catch (error) {
                                console.log(error)
                            }
                        break;
                    }
                }
                else {
                    Embedsearch.setColor('#0099ff')
                    .setTitle(`No songs playing right now`)
                    .setThumbnail(``)
                    .setURL(``)
                    .setDescription(``)
                    var secMessage
                    var buttons = interaction.message.components[0]
                    var buttons2 = interaction.message.components[1]
                    switch (playerCommandName) {
                        case "Join":
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
                                console.log(error)
                            }
                        break;
                        case "Previous":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "(Un)Pause":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "Next":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "Leave":
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
                                console.log(error)
                            }
                        break;
                        case "Less commands 🔼":
                            buttons2.components[0].setLabel("More commands 🔽")
                            buttons2.components[0].setCustomId("More commands 🔽")
                            secMessage = await selChannel.messages.cache.get(interaction.message.id)
                            secMessage.edit({components: [buttons,buttons2] });
                            interaction.deferUpdate()
                        break;
                        case "More commands 🔽":
                            var moreButtonscommands = [
                            {name:"Shuffle",emoji:"🔀",style:"SECONDARY"},
                            {name:"Loop",emoji:"🔁",style:"SECONDARY"},
                            {name:"Queue",emoji:"🔢",style:"SECONDARY"},
                            {name:"Vol Down",emoji:"🔉",style:"SECONDARY"},
                            {name:"Vol Up",emoji:"🔊",style:"SECONDARY"},
                            ]
                            const moreButtons = new MessageActionRow()
                            for (let i = 0; i < moreButtonscommands.length; i++) {
                                moreButtons.addComponents(
                                    new MessageButton()
                                    .setCustomId(`${moreButtonscommands[i].name}`)
                                    .setLabel(`${moreButtonscommands[i].emoji}`)
                                    .setStyle(`${moreButtonscommands[i].style}`),
                                ); 
                            }
                            buttons2.components[0].setLabel("Less commands 🔼")
                            buttons2.components[0].setCustomId("Less commands 🔼")
                            secMessage = await selChannel.messages.cache.get(interaction.message.id)
                            secMessage.edit({components: [buttons,buttons2,moreButtons] });
                            interaction.deferUpdate()
                        break;
                        case "Shuffle":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "Loop":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "Queue":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "Vol Down":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                        case "Vol Up":
                            interaction.reply({
                                content: "No songs in queue",
                                ephemeral: true
                            })
                        break;
                    }
                }
            }
            setTimeout(() => {
                cooldownUser.delete(interaction.user.id);
            }, 3*1000);
        } catch (error) {
            console.log(error)
        }
	}
};
