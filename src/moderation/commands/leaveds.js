module.exports = {
    name: "leave",
    command:"leave",
    desc:'Bot will leave this discord!',
    example:"/moderation leave",
	async execute(interaction,lang) {
        /*try {
            var listChannels = await interaction.guild.channels.fetch()
            var createdChannel = ["Serverstats","Welcomer","Member","Online","Offline","welcome","choose-role","Music Zone","Music","player-room","Kurama-Zone","player-settings","welcomer-settings","bot-settings","Ticket Zone","create-ticket","Admin Zone","reports","log","warn","start-with-kurama"]
            var listRoles = await interaction.guild.roles.fetch()           
            try {
                var memberRole = await listRoles.find(role => role.name.includes("Member"))
                memberRole? memberRole.delete() : ""
                var mutedRole = await listRoles.find(role => role.name.includes("Muted"))
                mutedRole? mutedRole.delete() : ""
                await listChannels.forEach(async channel => {createdChannel.forEach(async lfChannel =>{
                        if (channel.name.includes(lfChannel)) {
                            try {
                                await channel.delete()
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    })
                })
                var newChannels = await interaction.guild.channels.fetch()
                var selectedChannel = await newChannels.find(channel => channel.type== "GUILD_TEXT")
                await selectedChannel.send(lang.get(interaction.guild.lang).commands.moderation["optLeaveDs"])
                await interaction.guild.leave();
            } catch (error) {
              console.log(error)  
            }
        } catch (error) {
            console.log(error)
        }*/
    }
};