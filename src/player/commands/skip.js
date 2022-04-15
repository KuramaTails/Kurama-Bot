module.exports = {
    name: "skip",
    command:"skip",
    desc:'Bot will skip this song!',
    example:"/player skip",
	async execute(interaction,player,lang,voiceChannel) {
        var stringSkip = lang.get(interaction.guild.lang).commands.player.commands["skip"]
        var stringErrSkip = lang.get(interaction.guild.lang).commands.player.commands.errors["skip"]
        var stringErrQueue = lang.get(interaction.guild.lang).commands.player.commands.errors["queue"]
        player.getQueue(voiceChannel)? (player.queues.collection.first().songs.length>1? (player.skip(voiceChannel),interaction.followUp({content: stringSkip,ephemeral: true})) : (player.voices.leave(voiceChannel),interaction.followUp({content: stringErrSkip,ephemeral: true}))) : interaction.followUp({content: stringErrQueue,ephemeral: true})  
	},
};

/*

if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                    var countMembers = Array.from(voiceChannel.members.keys())
                    if (!playerUser.has(interaction.guild.id)) {
                        playerUser.set(interaction.guild.id,[interaction.user.id]);
                    }
                    else {
                        if (!playerUser.get(interaction.guild.id).find(id =>id==interaction.user.id)) {
                            playerUser.get(interaction.guild.id).push(interaction.user.id)
                        }
                    }
                    if (playerUser.get(interaction.guild.id).length<countMembers.length/2) {
                        var memberLeft= countMembers.length/2-playerUser.get(interaction.guild.id).length
                        console.log(memberLeft)
                        var string = lang.get(modal.guild.lang).commands.player.commands.errors["skip"]
                        let result = string.replace("${memberLeft}",memberLeft);
                        return interaction.reply({
                            content: result ,
                            ephemeral: true
                            })
                    }
                }
                if (player.queues.collection.first().songs.length>1) {
                    player.skip(voiceChannel)
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.commands["skip"],
                        ephemeral: true
                        })
                }
                else {
                    player.voices.leave(voiceChannel)
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).buttons.player.commands.errors["queue"],
                        ephemeral: true
                        })
                }

*/