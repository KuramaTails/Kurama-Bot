const { config } = require("./config");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { getVoiceConnection, joinVoiceChannel, createAudioResource } = require("@discordjs/voice");
const mm = require('music-metadata');
const { Readable } = require('stream');
const { player, audioPlayer } = require("../../bot");

module.exports = {
    async execute(gAssistant,interaction,textQuery) {
        var arr = []
        const startConversation = (conversation) => {
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
              setTimeout( async () => {
                var stream = Readable.from(Buffer.concat(arr));
                var resource=createAudioResource(stream)
                var metadata = await mm.parseBuffer(Buffer.concat(arr));
                resource.volume=interaction.guild.settings.plugins.playerPlugin.volume/100;
                if(player.queues.collection.get(interaction.guild.id)) {
                    var queue = player.queues.collection.get(interaction.guild.id)
                    queue.pause()
                }
                connection.subscribe(audioPlayer);
                audioPlayer.play(resource);
                if(player.queues.collection.get(interaction.guild.id)) {
                  setTimeout(async () => {
                      var music = await player.voices.join(interaction.member.voice.channel)
                      connection.subscribe(music.audioPlayer)
                      queue.resume()
                  }, (metadata.format.duration+0.5)*1000);
                }
              }, 1000);
            })
            .on('ended', async (error, continueConversation) => {
            if (error) console.log('Conversation Ended Error:', error);
            else if (continueConversation) {
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Answer')
                    .setDescription('Continue?')
                const buttons = new MessageActionRow()
                buttons.addComponents(
                    new MessageButton()
                    .setCustomId(`assistant-y`)
                    .setLabel(`y`)
                    .setStyle("PRIMARY"),
                );
                interaction.followUp({embeds: [embed],components: [buttons]})
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
        config.conversation.textQuery = textQuery
        gAssistant.start(config.conversation,startConversation)
    }
}