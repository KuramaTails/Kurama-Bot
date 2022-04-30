module.exports = {
    name: "leaveds",
    command:"leaveds",
    desc:'Bot will leave this discord!',
    example:"/moderation leaveds",
	async execute(interaction,lang) {
        try {
            await interaction.guild.channels.fetch()
            var createdChannel = ["Admin Zone","Kurama-Zone","Serverstats","Ticket Zone","Welcomer","Music Zone",]
            var listRoles = await interaction.guild.roles.fetch()           
            await createdChannel.forEach(async category => {
                var par = interaction.guild.channels.cache.find(channel =>channel.name == category)
                if (par) {
                    await par.children.forEach(async channel => await channel.delete())
                    await par.delete()
                }
            });
            var memberRole = await listRoles.find(role => role.name.includes("Member"))
            if(memberRole) memberRole.delete() 
            var mutedRole = await listRoles.find(role => role.name.includes("Muted"))
            if(mutedRole) mutedRole.delete()
            var newChannels = await interaction.guild.channels.fetch()
            var selectedChannel = await newChannels.find(channel => channel.type== "GUILD_TEXT")
            console.log(interaction.guild.settings)
            await selectedChannel.send(lang.get(interaction.guild.settings.lang).commands.moderation["optLeaveDs"])
            await interaction.guild.leave();
        } catch (error) {
            console.log(error)
        }
    }
};