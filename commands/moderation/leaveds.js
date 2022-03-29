const dbconnect = require("../../db/dbconnect");
const dbdisconnnect = require("../../db/dbdisconnnect");
const channelsSchema = require("../../schemas/channels-schema");
const guildSchema = require("../../schemas/guild-schema");
const membersSchema = require("../../schemas/members-schema");
const playerSchema = require("../../schemas/player-schema");
const rolesSchema = require("../../schemas/roles-schema");
const welcomeSchema = require("../../schemas/welcome-schema");

module.exports = {
	async execute(interaction) { 
        try {
            await dbconnect()
            try {
                await guildSchema.deleteOne({ "_id" : interaction.guild.id})
                await channelsSchema.deleteOne({ "_id" : interaction.guild.id})
                await membersSchema.deleteOne({ "_id" : interaction.guild.id})
                await playerSchema.deleteOne({ "_id" : interaction.guild.id})
                await rolesSchema.deleteOne({ "_id" : interaction.guild.id})
                await welcomeSchema.deleteOne({ "_id" : interaction.guild.id})
            } catch (error) {
                console.log(error)
            }
            await dbdisconnnect()
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
                        await newChannels.get(newKeys[i]).send("I'm sorry😢, admin wants me to drop this discord! Goodbye😋 ")
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