const { MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const GoogleAssistant = require('google-assistant');
const { getVoiceConnection, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const mm = require('music-metadata');
const bot = require('../../bot');
const { Readable } = require('stream');

const config = {
    auth: {
        keyFilePath: path.resolve('oauth.json'),
        savedTokensPath: path.resolve('../../tokens.json'),
      },
  conversation: {
    audio: {
      encodingIn: 'LINEAR16',
      sampleRateIn: 16000,
      encodingOut: 'OPUS_IN_OGG', // supported are LINEAR16 / MP3 / OPUS_IN_OGG (defaults to LINEAR16)
      sampleRateOut: 24000,
    },
    lang: 'it-IT',
    deviceModelId: 'xxxxxxxx',
    deviceId: 'xxxxxx',
    deviceLocation: {
      coordinates: {
        latitude: 45.0819359,
        longitude: 7.659093,
      },
    },
    textQuery: '',
    isNew: true,
    screen: {
      isOn: true,
    }
  },
};
module.exports = {
	execute(message) {
        var arr = []
        var buffer
        config.conversation.textQuery = message.content
        const assistant = new GoogleAssistant(config.auth);

        const startConversation = (conversation) => {

        conversation
            .on('audio-data', (audioBuffer) => {
                arr.push(Buffer.from(audioBuffer));
            })
            .on('response', async text => {
              var connection = getVoiceConnection(message.guild.id);
                if (!connection) {
                    connection = joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator
                    })
                }
                if (!connection || connection.joinConfig.channelId != message.member.voice.channelId) return
              setTimeout( async () => {
                buffer = Buffer.concat(arr);
                var stream = Readable.from(buffer);
                var resource=createAudioResource(stream)
                var metadata = await mm.parseBuffer(buffer);
                resource.volume=message.guild.settings.plugins.playerPlugin.volume/100;
                if(bot.player.queues.collection.get(message.guild.id)) {
                    var queue = bot.player.queues.collection.get(message.guild.id)
                    queue.pause()
                }
                connection.subscribe(bot.audioPlayer);
                bot.audioPlayer.play(resource);
                if(bot.player.queues.collection.get(message.guild.id)) {
                  setTimeout(async () => {
                      var music = await bot.player.voices.join(message.member.voice.channel)
                      connection.subscribe(music.audioPlayer)
                      queue.resume()
                  }, (metadata.format.duration+0.5)*1000);
                }
              }, 1000);
            })
            .on('data', (data) => {
              // raw data from the google assistant conversation
              // useful for debugging or if something is not covered above
              if (data.dialogStateOut) {
                var imgBuffer = new Buffer.from(data.dialogStateOut.conversationState, "base64");
                const attachment = new MessageAttachment(imgBuffer, 'image.png');
                const exampleEmbed = new MessageEmbed()
                .setColor('#36393e')
                .setImage('attachment://image.png');

                message.reply({ embeds: [exampleEmbed], files: [attachment] });
              }
            })
            .on('ended', async (error, continueConversation) => {
            if (error) console.log('Conversation Ended Error:', error);
            else if (continueConversation) {
              /*config.conversation.textQuery = message.content;
              assistant.start(config.conversation, startConversation);*/
            }
            else {
                console.log('Conversation Complete');
            }
            })
            .on('error', (error) => {
            console.log(error)
            })
        };
        assistant
        .on('ready', () => assistant.start(config.conversation))
        .on('started', startConversation);

    }
}