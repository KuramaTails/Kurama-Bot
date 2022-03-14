const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Select loop mode!')
        .addStringOption(option =>
            option.setName("mode")
            .setDescription("Select a repeat mode : DISABLED = 0, SONG = 1 , QUEUE = 2")
            .setRequired(true)
            ),
        
	async execute(interaction,player) {
        try {
            var member = interaction.member.cache.get(interaction.user.id)
            var mode
            if (member.voice.channel) {
                if(player.getQueue(member.voice.channel)) {
                    switch(parseInt(interaction.options.getString("mode"))) {
                        case 0:
                            player.setRepeatMode(member.voice.channel, 1)
                            mode = "DISABLED"
                            interaction.followUp({
                                content: "Set repeat mode to `" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 1:
                            player.setRepeatMode(member.voice.channel, 2)
                            mode = "SONG"
                            interaction.followUp({
                                content: "Set repeat mode to `" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        case 2:
                            player.setRepeatMode(member.voice.channel, 0)
                            var mode = "QUEUE"
                            interaction.followUp({
                                content: "Set repeat mode to `" + mode + "`",
                                ephemeral: true
                            })
                            break;
                        default:
                            interaction.followUp({
                                content: "Please provide an available loop mode: DISABLED = 0, SONG = 1 , QUEUE = 2 ",
                                ephemeral: true
                            })
                            break;
                    } 
                }
                else {
                    interaction.followUp({
                        content: "No songs in queue.",
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