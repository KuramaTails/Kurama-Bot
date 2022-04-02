module.exports = {
    name: "leave",
    command:"leave",
    desc:'Bot will leave this discord!',
    example:"/moderation leave",
	async execute(interaction,lang) { 
        try {
            var listChannels = await interaction.guild.channels.cache
            var listRoles = await interaction.guild.roles.cache
            try {
                await listRoles.find(role => role.name.includes("Member")).delete()
                await listRoles.find(role => role.name.includes("Muted")).delete()
            } catch (error) {
              console.log(error)  
            }
            
            setTimeout(async () => {
                try {
                    await listChannels.find(channel => channel.name.includes("Serverstats")).delete()
                    await listChannels.find(channel => channel.name.includes("Welcomer")).delete()
                    await listChannels.find(channel => channel.name.includes("Music-Zone")).delete()
                    await listChannels.find(channel => channel.name.includes("Members")).delete()
                    await listChannels.find(channel => channel.name.includes("Online")).delete()
                    await listChannels.find(channel => channel.name.includes("Offline")).delete()
                    await listChannels.find(channel => channel.name.includes("welcome")).delete()
                    await listChannels.find(channel => channel.name.includes("choose-role")).delete()
                    await listChannels.find(channel => channel.name.includes("player-room")).delete()
                    await listChannels.find(channel => channel.name.includes("Room 1")).delete()
                    await listChannels.find(channel => channel.name.includes("Room 2")).delete()
                    await listChannels.find(channel => channel.name.includes("Room 3")).delete()
                } catch (error) {
                    console.log(error)
                }
                var newChannels = await interaction.guild.channels.fetch()
                var newKeys = Array.from(newChannels.keys())
                for (let i = 0; i < newKeys.length; i++) {
                    if (newChannels.get(newKeys[i]).type== "GUILD_TEXT"){
                        await newChannels.get(newKeys[i]).send(lang.get(interaction.guild.lang).commands.moderation["optLeaveDs"])
                        await interaction.guild.leave();
                        return
                    }
                }
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }
};