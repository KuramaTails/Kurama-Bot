module.exports = {
	async execute(interaction) { 
        var listchannels = await interaction.guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        try {
            for (let i = 0; i < keyschannels.length; i++) {
                switch (true) {
                    case listchannels.get(keyschannels[i]).name.includes("Serverstats"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Welcomer"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Music-Zone"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;            
                    case listchannels.get(keyschannels[i]).name.includes("Members"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Online"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Offline"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("welcome"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("choose-role"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("player-room"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Room 1"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Room 2"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Room 3"):
                        await listchannels.get(keyschannels[i]).delete()
                    break;
                    default:
                    break;
                }
                
            }	
            var newlistchannels = await interaction.guild.channels.fetch()
            var newkeyschannels = Array.from(newlistchannels.keys())
            
            for (let i = 0; i < newkeyschannels.length; i++) {
                if (listchannels.get(keyschannels[i]).type== "GUILD_TEXT"){
                    await interaction.followUp("I'm sorry😢, admin wants me to drop this discord! Goodbye😋 ")
                    await interaction.guild.leave();
                    return
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
};