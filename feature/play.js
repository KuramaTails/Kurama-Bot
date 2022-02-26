const { createAudioPlayer, joinVoiceChannel , AudioPlayerStatus  , createAudioResource, PlayerSubscription } = require('@discordjs/voice');
const { clientId, guildId, token } = require('../config.json');

module.exports = {
	name: "play",
	ephemeral: "false",
    command:"Play",
    desc:"Bot will play something on your vocal channel",
    example:"!play url",
	async execute(messageCreate,bot) {
        const player = createAudioPlayer();
        player.on(AudioPlayerStatus.Playing, () => {
            console.log("Audio player started playing")
        })
        let resource = createAudioResource('C:\\Users\\Gianmarco\\Documents\\discord-bot-test\\music\\bunnygirl.mp3');
        player.play(resource);
        const connection = joinVoiceChannel({
            channelId: messageCreate.member.voice.channelId,
            guildId: messageCreate.guild.id,
            adapterCreator: messageCreate.guild.voiceAdapterCreator,
        });
        console.log("Created voice connection")
        const subscription = connection.subscribe(player);
    }
}
