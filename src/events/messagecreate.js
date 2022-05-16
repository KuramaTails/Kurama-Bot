const fs = require('fs');
const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");
const googleTTS = require('google-tts-api');
const {createAudioResource, getVoiceConnection} = require("@discordjs/voice");
const mm = require('music-metadata');
const { auth } = require('google-auth-library');
const asda = require('./asda');

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            await spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                console.log(message.guild.settings)
                var connection = getVoiceConnection(message.guild.id);
                if (!connection || connection.joinConfig.channelId != message.member.voice.channelId) return
                await googleTTS.getAudioBase64(message.content, { lang: message.guild.settings.lang, slow: false })
                .then((base64) => {
                  const buffer = Buffer.from(base64, 'base64');
                  fs.writeFileSync('./src/sounds/tts.mp3', buffer, { encoding: 'base64' });
                })
                .catch(console.error);
                
                var resource= createAudioResource(fs.createReadStream('src/sounds/tts.mp3'));
                var metadata = await mm.parseFile('./src/sounds/tts.mp3');
                resource.volume=message.guild.settings.plugins.playerPlugin.volume/100;
                if(bot.player.queues.collection.get(message.guild.id)) {
                    var queue = bot.player.queues.collection.get(message.guild.id)
                    queue.pause()
                }
                connection.subscribe(bot.audioPlayer);
                bot.audioPlayer.play(resource);
                setTimeout(async () => {
                    var music = await bot.player.voices.join(message.member.voice.channel)
                    connection.subscribe(music.audioPlayer)
                    if(bot.player.queues.collection.get(message.guild.id)) queue.resume()
                }, (metadata.format.duration+0.5)*1000);
            }
            else {
                await asda.execute()
            }
        }
	}
};
