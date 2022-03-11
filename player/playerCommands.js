const { RepeatMode } = require("distube");
module.exports = {
    async execute(msg,msgfeature,args,player) {
        if(!player.getQueue(msg)) { 
            switch (msgfeature) {
                case "play":
                    if(msg.member.voice.channel) {
                        let link = args.join(" ");
                            if(!link) return msg.reply("Please enter a song url or query to search");
                            await player.play(msg.member.voice.channel, link)
                    }
                    else {
                        msg.reply(
                            'You must join a voice channel first.'
                        )
                    }
                break;
                case "addsong":
                    if(msg.member.voice.channel) {
                        let newlink = args.join(" ");
                        if(!newlink) return msg.reply("Please enter a song url or query to search");
                        await player.play(msg.member.voice.channel,newlink) 
                    }
                    else {
                        msg.reply(
                            'You must join a voice channel first.'
                        )
                    }
                    break;
                case "loop":
                    msg.reply("No songs in queue")
                    break;
                case "stop":
                    msg.reply("No songs in queue")
                break;
                case "join":
                    player.voices.join(msg.member.voice.channel)
                    break;
                case "leave":
                    player.voices.leave(msg.member.voice.channel)
                    break;
                case "skip":
                    msg.reply("No songs in queue")
                break;
                case "queue":
                    msg.reply("No songs in queue")
                    break;
                case "pause":
                    msg.reply("No songs in queue")
                    break;
                case "resume":
                    msg.reply("No songs in queue")
                break;
                default:
                    msg.reply("No commands found")
                break;
            }
        }
        else {
            switch (msgfeature) {
                case "play":
                    msg.reply("Please use !addsong command for adding songs in queue")
                break;
                case "addsong":
                    if(msg.member.voice.channel) {
                        let oldqueue = player.queues.collection.first().songs.length
                        let newlink = args.join(" ");
                        if(!newlink) return msg.reply("Please enter a song url or query to search");
                        await player.play(msg.member.voice.channel,newlink) 
                        let newqueue = player.queues.collection.first().songs.length
                        diffqueue = newqueue-oldqueue;
                        msg.reply("Added "+ diffqueue + " song(s) to queue")
                    }
                    else {
                        msg.reply(
                            'You must join a voice channel first.'
                        )
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
                        msg.reply("Set repeat mode to `" + mode + "`");
                        break;
                    }
                    else {
                        msg.reply("Please provide a loop mode: DISABLED = 0, SONG = 1 , QUEUE = 2 ")
                    }
                break;	
                case "stop":
                if (!player.queues.collection.first().stopped) {
                    player.stop(msg)
                    msg.reply('Stopped the music!')
                }
                else {
                    msg.reply("Player is not playing any song")
                }
                break;
                case "leave":
                if (bot.voice.adapters) {
                    player.voices.leave(msg)
                    msg.reply('Leaved the voice channel!')
                }
                else {
                    msg.reply("Player is not in this channel")
                }
                break;
                case "skip":
                    if (player.queues.collection.first().playing) {
                        if (player.queues.collection.first().songs.length>1) {
                            player.skip(msg)
                            msg.reply("Song skipped")
                        }
                        else {
                            player.voices.leave(msg)
                            msg.reply('Leaved the voice channel, no more songs in queue!')
                        }
                    }
                    else {
                        msg.reply('Nothing playing right now!')
                    } 
                break;
                case "queue":
                    msg.reply(
                        `Current queue:\n${player.queues.collection.first().songs
                            .map((song, id) =>	`**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``)
                            .slice(0, 10)
                            .join('\n')}`,
                    )
                    break;
                case "pause":
                    if (!player.queues.collection.first().paused) {
                        player.pause(msg)
                        msg.reply("Player paused")	
                    }
                    else {
                        msg.reply('Player already in pause!')
                    }
                    break;
                case "resume":
                    if (!player.queues.collection.first().playing) {
                        player.resume(msg)
                        msg.reply("Player resumed")
                    }
                    else {
                        msg.reply('Player already playing!')
                    }
                break;
                default:
                    msg.reply("No commands found")
                break;
            }
        }	
    }
};
   
