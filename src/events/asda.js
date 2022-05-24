const path = require('path');
const GoogleAssistant = require('google-assistant');
const { writeFileSync, createReadStream } = require('fs');
const { getVoiceConnection, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const mm = require('music-metadata');
const bot = require('../../bot');

const config = {
    auth: {
        keyFilePath: path.resolve('oauth.json'),
        savedTokensPath: path.resolve('../../tokens.json'),
      },
  conversation: {
    audio: {
      encodingIn: 'LINEAR16', // supported are LINEAR16 / FLAC (defaults to LINEAR16)
      sampleRateIn: 16000, // supported rates are between 16000-24000 (defaults to 16000)
      encodingOut: 'MP3', // supported are LINEAR16 / MP3 / OPUS_IN_OGG (defaults to LINEAR16)
      sampleRateOut: 24000, // supported are 16000 / 24000 (defaults to 24000)
    },
    lang: 'it-IT',
    deviceModelId: 'xxxxxxxx',
    deviceId: 'xxxxxx',
    deviceLocation: {
      coordinates: {
        latitude: 45.0677551,
        longitude: 7.6824892,
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

        // starts a new conversation with the assistant
        const startConversation = (conversation) => {
        // setup the conversation and send data to it
        // for a full example, see `examples/mic-speaker.js`

        conversation
            .on('audio-data', (audioBuffer) => {
                //console.log(audioBuffer)
                arr.push(Buffer.from(audioBuffer));
            // do stuff with the audio data from the server
            // usually send it to some audio output / file
            })
            .on('end-of-utterance', () => {
            // do stuff when done speaking to the assistant
            // usually just stop your audio input
            })
            .on('transcription', (data) => {
            // do stuff with the words you are saying to the assistant
            })
            .on('response', (text) => {
            // do stuff with the text that the assistant said back
            })
            .on('volume-percent', (percent) => {
            // do stuff with a volume percent change (range from 1-100)
            })
            .on('device-action', (action) => {
            // if you've set this device up to handle actions, you'll get that here
            })
            .on('screen-data', (screen) => {
            // if the screen.isOn flag was set to true, you'll get the format and data of the output
            })
            .on('ended', async (error, continueConversation) => {
            // once the conversation is ended, see if we need to follow up
            if (error) console.log('Conversation Ended Error:', error);
            else if (continueConversation) assistant.start();
            else {
                console.log('Conversation Complete');
                buffer = Buffer.concat(arr);

                writeFileSync('src/sounds/reply.mp3', buffer, { encoding: 'base64' });
                var connection = getVoiceConnection(message.guild.id);
                if (!connection) {
                    connection = joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator
                    })
                }
                if (!connection || connection.joinConfig.channelId != message.member.voice.channelId) return
                var resource=createAudioResource(createReadStream('src/sounds/reply.mp3'))
                var metadata = await mm.parseFile('./src/sounds/reply.mp3');
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
            }
            })
            .on('data', (data) => {
            // raw data from the google assistant conversation
            // useful for debugging or if something is not covered above
            })
            .on('error', (error) => {
            // handle error messages
            })
        };

        // will start a conversation and wait for audio data
        // as soon as it's ready
        assistant
        .on('ready', () => assistant.start(config.conversation))
        .on('started', startConversation);

    }
}