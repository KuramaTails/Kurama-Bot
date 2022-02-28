const { createAudioPlayer, joinVoiceChannel , AudioPlayerStatus  , createAudioResource, PlayerSubscription } = require('@discordjs/voice');
const { clientId, guildId, token } = require('../config.json');
const DisTube = require('distube')
const Discord = require('discord.js')
const { YtDlpPlugin } = require('@distube/yt-dlp')

module.exports = {
	name: "play",
	ephemeral: "false",
    command:"Play",
    desc:"Bot will play something on your vocal channel",
    example:"!play url",
	async execute(messageCreate,args) {
        const distube = new DisTube.default(messageCreate.client, {
            leaveOnStop: false,
            searchSongs: 1,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            youtubeDL: false,
            plugins: [
                new YtDlpPlugin()
              ],
          } ) 
        const string = args.join(' ')
        distube.play(messageCreate.member.voice.channel, args.join(' '), {
            messageCreate,
            textChannel: messageCreate.channel,
            member: messageCreate.member,
        })
        .catch((err) => console.log(err));
    }
}