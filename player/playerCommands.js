const { RepeatMode } = require("distube");
module.exports = {
    async execute(msg,msgfeature,args,player,guild) {
        var listchannels = await guild.channels.fetch()
        var selChannel = listchannels.get(msg.channelId)
        if(!player.getQueue(msg)) { 
            switch (msgfeature) {
                case "play":
                    if(msg.member.voice.channel) {
                        let link = args.join(" ");
                        msg.delete();
                        if(!link) return selChannel.send("Please enter a song url or query to search").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                        await player.play(msg.member.voice.channel, link)
                    }
                    else {
                        msg.delete();
                        selChannel.send('You must join a voice channel first.').then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                break;
                case "addsong":
                    if(msg.member.voice.channel) {
                        let newlink = args.join(" ");
                        msg.delete();
                        if(!newlink) return selChannel.send("Please enter a song url or query to search").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                        await player.play(msg.member.voice.channel,newlink) 
                    }
                    else {
                        msg.delete();
                        selChannel.send('You must join a voice channel first.').then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                    break;
                case "loop":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                    break;
                case "stop":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "join":
                    player.voices.join(msg.member.voice.channel)
                    selChannel.send("Player joined your voice Channel").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                    break;
                case "leave":
                    player.voices.leave(msg.member.voice.channel)
                    selChannel.send("Player leaved your voice Channel").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                    break;
                case "skip":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "previous":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "queue":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                    break;
                case "pause":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                    break;
                case "resume":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "shuffle":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "volume":
                    msg.delete();
                    selChannel.send("No songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
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
        else {
            switch (msgfeature) {
                case "play":
                    msg.delete();
                    selChannel.send("Please use !addsong command for adding songs in queue").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
                case "addsong":
                    if(msg.member.voice.channel) {
                        let oldqueue = player.queues.collection.first().songs.length
                        let newlink = args.join(" ");
                        if(!newlink) return msg.reply("Please enter a song url or query to search").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                        await player.play(msg.member.voice.channel,newlink) 
                        let newqueue = player.queues.collection.first().songs.length
                        diffqueue = newqueue-oldqueue;
                        msg.delete();
                        selChannel.send("Added "+ diffqueue + " song(s) to queue").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                    else {
                        msg.delete();
                        selChannel.send('You must join a voice channel first.').then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                    break;
                case "loop":
                    var mode;
                    if (args[0] != null) {
                        switch(player.setRepeatMode(msg, parseInt(args[0]))) {
                            case RepeatMode.DISABLED:
                                mode = "Off";
                                break;
                            case RepeatMode.SONG:
                                mode = "Repeat a song";
                                break;
                            case RepeatMode.QUEUE:
                                mode = "Repeat all queue";
                                break;
                        }
                        msg.delete();
                        selChannel.send("Set repeat mode to `" + mode + "`").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                        break;
                    }
                    else {
                        msg.delete();
                        selChannel.send("Please provide a loop mode: DISABLED = 0, SONG = 1 , QUEUE = 2 ").then(botMessage => {
                            setTimeout(() => {
                                botMessage.delete()
                            }, 10*1000);
                        })
                    }
                break;	
                case "stop":
                if (!player.queues.collection.first().stopped) {
                    player.stop(msg)
                    msg.delete();
                    selChannel.send('Stopped the music!').then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                }
                else {
                    msg.delete();
                    selChannel.send("Player is not playing any song").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                }
                break;
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
   
