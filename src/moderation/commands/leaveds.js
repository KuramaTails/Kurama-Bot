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
                    var createdChannel = ["Serverstats","Welcomer","Member","Online","welcome","choose-role","Music Zone","music","player-room","Kurama-Zone","player-settings","welcomer-settings","bot-settings","Ticket Zone","create-ticket","Admin Zone","reports","log","warn"]
                    await createdChannel.forEach(lfChannel => listChannels.find(channel=> channel.name.includes(lfChannel)).delete())
                    var newChannels = await interaction.guild.channels.fetch()
                    var newKeys = Array.from(newChannels.keys())
                    for (let i = 0; i < newKeys.length; i++) {
                        if (newChannels.get(newKeys[i]).type== "GUILD_TEXT"){
                            await newChannels.get(newKeys[i]).send(lang.get(interaction.guild.lang).commands.moderation["optLeaveDs"])
                            await interaction.guild.leave();
                            return
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }
};