module.exports = {
	async execute(interaction,pollUser,pollCounter,lang) {
        if (pollUser.has(interaction.user.id)) {
            await interaction.followUp({ content: lang.get(interaction.guild.settings.lang).commands.poll["optPollDeny"], ephemeral: true });
        }
        else {
            pollUser.set(interaction.user.id, true);
            switch (interaction.customId) {
                case `Option 1`:
                    pollCounter[0] = pollCounter[0]+1
                break;
                case `Option 2`:
                    pollCounter[1] = pollCounter[1]+1
                break;
                case `Option 3`:
                    pollCounter[2] = pollCounter[2]+1
                break;
                case `Option 4`:
                    pollCounter[3] = pollCounter[3]+1
                break;
                case `Option 5`:
                    pollCounter[4] = pollCounter[4]+1
                break;
            }
            await interaction.followUp({ content: lang.get(interaction.guild.settings.lang).commands.poll["optPollThank"], ephemeral: true });
        }
	}
};

