const { RepeatMode } = require("distube");
module.exports = {
    async execute(msg,msgfeature,args,player) {
        var listchannels = msg.guild.channels.cache
        var selChannel = listchannels.get(msg.channelId)
        if(player.getQueue(msg)){
            switch (msgfeature) {
                case "leave":
                if (bot.voice.adapters) {
                    player.voices.leave(msg)
                    msg.delete();
                    selChannel.send('Leaved the voice channel!').then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                }
                else {
                    msg.delete();
                    selChannel.send("Player is not in this channel").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                }
                break;
                case "skip":
                    if (player.queues.collection.first().playing) {
                        if (player.queues.collection.first().songs.length>1) {
                            player.skip(msg)
                            msg.delete();
                            selChannel.send("Song skipped").then(botMessage => {
                                setTimeout(() => {
                                    botMessage.delete()
                                }, 10*1000);
                            })
                        }
                        else {
                            player.voices.leave(msg)
                            msg.delete();
                            selChannel.send('Leaved the voice channel, no more songs in queue!').then(botMessage => {
                                setTimeout(() => {
                                    botMessage.delete()
                                }, 10*1000);
                            })
                        }
                    }
                    else {
                        msg.delete();
                        selChannel.send('Nothing playing right now!').then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    } 
                break;
                case "previous":
                    player.previous(msg);
                    msg.delete();
                    selChannel.send("Playing previous song").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "queue":
                    msg.delete();
                    selChannel.send(
                        `Current queue:\n${player.queues.collection.first().songs
                            .map((song, id) =>	`**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``)
                            .slice(0, 10)
                            .join('\n')}`,
                    ).then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                    break;
                case "pause":
                    if (!player.queues.collection.first().paused) {
                        player.pause(msg)
                        msg.delete();
                        selChannel.send("Player paused").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })	
                    }
                    else {
                        msg.delete();
                        selChannel.send('Player already in pause!').then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                    break;
                case "resume":
                    if (!player.queues.collection.first().playing) {
                        player.resume(msg)
                        msg.delete();
                        selChannel.send("Player resumed").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                    else {
                        msg.delete();
                        selChannel.send('Player already playing!').then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                break;
                case "shuffle":
                    try {
                        player.shuffle(textchannel);
                        msg.delete();
                        selChannel.send("Queue shuffled").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    } catch (error) {
                        console.log(error)
                    }
                break;
                case "volume":
                    try {
                        var volume = parseInt(args[0]) 
                        player.setVolume(selChannel, volume);
                        msg.delete();
                        selChannel.send("Set volume to `" + volume + "`").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    } catch (error) {
                        console.log(error)
                    }
                break;
                default:
                    msg.delete();
                    selChannel.send("No commands found").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
            }
        }	
    }
};
   
