const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Player stops playing!'),
        
	async execute(interaction,player) {
        try {
            var member = interaction.member.cache.get(interaction.user.id)
            if (member.voice.channel) {
                if (!player.queues.collection.first().stopped) {
                    player.stop(member.voice.channel)
                    interaction.reply({
                        content: "Player stopped",
                        ephemeral: true
                    })
                }
                else {
                    interaction.reply({
                        content: "Player already stopped",
                        ephemeral: true
                    })
                }
            }
            else { 
                interaction.followUp({
                    content: "You must join a voice channel first.",
                    ephemeral: true
                })
            }
        } catch (error) {
            console.log(error)
        }      
	},
};