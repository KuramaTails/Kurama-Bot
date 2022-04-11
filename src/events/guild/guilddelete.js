const dbconnect = require("../../misc/db/dbconnect");
const dbdisconnect = require("../../misc/db/dbdisconnect");
const channelsSchema = require("../../schemas/channels-schema");
const guildSchema = require("../../schemas/guild-schema");
const membersSchema = require("../../schemas/members-schema");
const playerSchema = require("../../schemas/player-schema");
const rolesSchema = require("../../schemas/roles-schema");
const welcomeSchema = require("../../schemas/welcome-schema");

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        await dbconnect()
        try {
            await guildSchema.deleteOne({ "_id" : guild.id})
            await channelsSchema.deleteOne({ "_id" : guild.id})
            await membersSchema.deleteOne({ "_id" : guild.id})
            await playerSchema.deleteOne({ "_id" : guild.id})
            await rolesSchema.deleteOne({ "_id" : guild.id})
            await welcomeSchema.deleteOne({ "_id" : guild.id})
        } catch (error) {
            console.log(error)
        }
        await dbdisconnect()
        console.log("Left a guild: " + guild.name);
    }
};