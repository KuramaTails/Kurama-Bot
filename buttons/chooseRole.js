module.exports = {
	async execute(selChannel,interaction) {
		var allRole = await selChannel.guild.roles.fetch()
        for (let i = 0; i < interaction.message.components[0].components.length; i++) {
            if (interaction.customId ==  interaction.message.components[0].components[i].customId) {
                var nameRole = interaction.message.components[0].components[i].label
            }
        }
        let keysRole = Array.from( allRole.keys() );
        for (let i = 0; i < keysRole.length; i++) {
            if (allRole.get(keysRole[i]).name == nameRole)
            {
                var selRole = allRole.get(keysRole[i])
                var selUser = await selChannel.guild.members.fetch(interaction.user.id,true);
                if (!selUser.roles.cache.has(selRole.id)) {
                    selUser.roles.add(selRole);
                    interaction.reply({
                        content: `Role ${selRole} added`,
                        ephemeral: true
                    })
                }
                else {
                    selUser.roles.remove(selRole);
                    interaction.reply({
                        content: `Role ${selRole} removed`,
                        ephemeral: true
                    })
                }
                
            }
        }
	}
};

