const GoogleAssistant = require('google-assistant');
const { config } = require('./config');
const { getVoiceConnection, joinVoiceChannel, createAudioResource } = require("@discordjs/voice");
const mm = require('music-metadata');
const { Readable } = require('stream');
const { player } = require("../../bot");
const {createAudioPlayer} = require("@discordjs/voice");


module.exports = {
    async execute(interaction,textQuery) {
        config.conversation.textQuery = textQuery
        var lang = interaction.guild.settings.lang
        switch (true) {
            case lang=='de':
                config.conversation.lang='de-DE'
                break;
            case lang=='it':
                config.conversation.lang='it-IT'
                break;
            case lang=='es':
                config.conversation.lang='es-ES'
                break;
            default:
                config.conversation.lang='en-US'
                break
        }
        const assistant = new GoogleAssistant(config.auth);

        const startConversation = (conversation) => {
            var arr = []
            conversation
            .on('audio-data', (audioBuffer) => {
                arr.push(Buffer.from(audioBuffer));
            })
            .on('response', async text => {
                var connection = getVoiceConnection(interaction.guild.id);
                if (!connection) {
                    connection = joinVoiceChannel({
                        channelId: interaction.member.voice.channel.id,
                        guildId: interaction.guild.id,
                        adapterCreator: interaction.guild.voiceAdapterCreator
                    })
                }
                if (!connection || connection.joinConfig.channelId != interaction.member.voice.channelId) return
                if(player.getQueue(interaction.guild.id)) {
                    var queue = player.queues.collection.get(interaction.guild.id)
                    queue.pause()
                }
                setTimeout( async () => {
                    var stream = Readable.from(Buffer.concat(arr));
                    var resource=createAudioResource(stream)
                    var metadata = await mm.parseBuffer(Buffer.concat(arr));
                    resource.volume=interaction.guild.settings.plugins.playerPlugin.volume/100;
                    const assistantPlayer = createAudioPlayer();
                    connection.subscribe(assistantPlayer);
                    assistantPlayer.play(resource);
                    setTimeout(async () => {
                        if(player.getQueue(interaction.guild.id)) {
                            var music = await player.voices.join(interaction.member.voice.channel)
                            connection.subscribe(music.audioPlayer)
                            queue.resume()
                        }
                    }, (metadata.format.duration+0.5)*1000);
                }, 1000);
            })
            .on('ended', async (error, continueConversation) => {
                if (error) console.log('Conversation Ended Error:', error);
                else if (continueConversation) {
                    console.log('Conversation continuing');
                }
                else {
                    console.log('Conversation Complete');
                }
                
                
            })
            .on('error', (error) => {
                console.log(error)
            })
        }
        assistant
        .on('ready', () => assistant.start(config.conversation))
        .on('started', startConversation);

    }
}