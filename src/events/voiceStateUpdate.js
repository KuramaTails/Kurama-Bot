const {createAudioResource, getVoiceConnection} = require("@discordjs/voice");
const { createReadStream } = require('fs')
const bot = require("../../bot");
module.exports = {
    name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        if (oldState.id==bot.client.application.id) return
        //if(bot.player.queues.collection.get(oldState.guild.id)) return
        if (oldState.channel != newState.channel) {
            var connection = getVoiceConnection(oldState.guild.id);
            if (!connection || connection.joinConfig.channelId != oldState.channelId && connection.joinConfig.channelId != newState.channelId) return
            var resource 
            switch (connection.joinConfig.channelId==newState.channelId) {
                case true:
                    resource=createAudioResource(createReadStream('src/sounds/connected.wav'))
                break;
                case false:
                    resource=createAudioResource(createReadStream('src/sounds/disconnected.wav'))
                break;
            }
            
            if(bot.player.queues.collection.get(oldState.guild.id)) {
                var queue = bot.player.queues.collection.get(oldState.guild.id)
                queue.pause()
                connection.subscribe(bot.audioPlayer);
                bot.audioPlayer.play(resource);
                queue.resume()
            }
        }
	}
};