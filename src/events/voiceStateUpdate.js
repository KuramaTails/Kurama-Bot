const {createAudioResource, getVoiceConnection, joinVoiceChannel} = require("@discordjs/voice");
const { createReadStream } = require('fs');
const bot = require("../../bot");
const mm = require('music-metadata');

module.exports = {
    name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        if (oldState.id==bot.client.application.id) return
        /*if (oldState.channel != newState.channel) {
            var channel
            var channel = !oldState.channel.id? newState : oldState
            var connection = getVoiceConnection(channel.guild.id);
            if (!connection) {
                connection = joinVoiceChannel({
                    channelId: channel.channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                })
            }
            if (!connection || connection.joinConfig.channelId != oldState.channelId && connection.joinConfig.channelId != newState.channelId) return
            var resource
            
            var metadata
            switch (connection.joinConfig.channelId==newState.channelId) {
                case true:
                    resource=createAudioResource(createReadStream('src/sounds/connected.wav'))
                    metadata = await mm.parseFile('src/sounds/connected.wav');
                    channel = newState.channel
                break;
                case false:
                    resource=createAudioResource(createReadStream('src/sounds/disconnected.wav'))
                    metadata = await mm.parseFile('src/sounds/disconnected.wav');
                    channel = oldState.channel
                break;
            }
            if(bot.player.queues.collection.get(oldState.guild.id)) {
                var queue = bot.player.queues.collection.get(oldState.guild.id)
                queue.pause()
            }
            connection.subscribe(bot.audioPlayer);
            bot.audioPlayer.play(resource);
            setTimeout(async () => {
                var music = await bot.player.voices.create(channel)
                connection.subscribe(music.audioPlayer)
                if(bot.player.queues.collection.get(oldState.guild.id)) queue.resume()
            }, (metadata.format.duration+0.5)*1000);
        }*/
	}
};