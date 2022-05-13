const {createAudioResource, getVoiceConnection} = require("@discordjs/voice");
const { createReadStream } = require('fs');
const bot = require("../../bot");
const mm = require('music-metadata');

module.exports = {
    name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        if (oldState.id==bot.client.application.id) return
        if (oldState.channel != newState.channel) {
            var connection = getVoiceConnection(oldState.guild.id);
            if (!connection || connection.joinConfig.channelId != oldState.channelId && connection.joinConfig.channelId != newState.channelId) return
            var resource 
            var channel
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
                var music = await bot.player.voices.join(channel)
                connection.subscribe(music.audioPlayer)
                if(bot.player.queues.collection.get(oldState.guild.id)) queue.resume()
            }, (metadata.format.duration+0.5)*1000);
        }
	}
};