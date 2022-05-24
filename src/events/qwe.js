const {createAudioResource, joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");
const { Assistant, AssistantLanguage } = require('nodejs-assistant');
const bot = require('../../bot');
const credentials = require('../../devicecredentials.json');
module.exports = {
	async execute(message) {
        var connection = getVoiceConnection(message.guild.id);
        if (!connection) {
            connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
        }
        const assistant = new Assistant({
            type: 'authorized_user',
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            refresh_token: credentials.refresh_token,
        },{
            locale: AssistantLanguage.ITALIAN, 
            deviceId: 'xxxxxx',
            deviceModelId: 'xxxxxx',
        });
        assistant.query('Hi!')
        .then(async response => {
            /*var r = new stream.PassThrough().end(response.audio);
            var resource=createAudioResource(r)
            connection.subscribe(bot.audioPlayer);
            bot.audioPlayer.play(resource);*/
            const audioContext = new AudioContext();
            const audio = await audioContext.decodeAudioData(response.audio);
            const source = audioContext.createBufferSource();
            source.buffer = audio;
            var resource=createAudioResource(source)
            connection.subscribe(bot.audioPlayer);
            bot.audioPlayer.play(resource);
        })
        .catch(err => {
            console.error('ERROR: ', err);
        });
    }
}