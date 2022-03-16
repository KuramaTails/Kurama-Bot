module.exports = {
	async execute(interaction,cooldownUser,selChannel) {
		var allRole = await selChannel.guild.roles.fetch()
        for (let y = 0; y < interaction.message.components.length; y++) {
            for (let i = 0; i < interaction.message.components[y].components.length; i++) {
                if (interaction.customId ==  interaction.message.components[y].components[i].customId) {
                    var nameRole = interaction.message.components[y].components[i].label
                }
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
        setTimeout(() => {
            cooldownUser.delete(interaction.user.id);
        }, 3*1000);
	}
};

