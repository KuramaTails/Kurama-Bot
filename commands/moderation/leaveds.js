const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);

module.exports = {
	name: "leaveds",
	ephemeral: "false",
	command:"leaveds",
	desc:"Leaves this Discord,deleting all categories and channels created",
    categ:"admin",
    example:"!clear <max 100 messages>",
	async execute(messageCreate) {
        var listchannels = await messageCreate.guild.channels.fetch()
        var keyschannels = Array.from(listchannels.keys())
        try {
            for (let i = 0; i < keyschannels.length; i++) {
                switch (true) {
                    case listchannels.get(keyschannels[i]).name.includes("Serverstats"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Members"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Online"):
                        listchannels.get(keyschannels[i]).delete()
                    break;            
                    case listchannels.get(keyschannels[i]).name.includes("Offline"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Music-Zone"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("player-room"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Room"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("Welcomer"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("welcome"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    case listchannels.get(keyschannels[i]).name.includes("choose-role"):
                        listchannels.get(keyschannels[i]).delete()
                    break;
                    default:
                    break;
                }
                
            }	
            var newlistchannels = await messageCreate.guild.channels.fetch()
            var newkeyschannels = Array.from(newlistchannels.keys())
            
            for (let i = 0; i < newkeyschannels.length; i++) {
                if (listchannels.get(keyschannels[i]).type== "GUILD_TEXT"){
                    listchannels.get(keyschannels[i]).send("I'm sorry😢, admin wants me to drop this discord! Goodbye😋 ")
                    var guildname = messageCreate.guild.name
                    await messageCreate.guild.leave();
                    return
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    }
};