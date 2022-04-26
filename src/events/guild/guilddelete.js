const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const channelsSchema = require("../../schemas/channels-schema");
const guildSchema = require("../../schemas/guild-schema");
const membersSchema = require("../../schemas/members-schema");
const rolesSchema = require("../../schemas/roles-schema");
const ticketSchema = require("../../schemas/ticket-schema");

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        await dbconnect()
        try {
            await channelsSchema.deleteOne({ "_id" : guild.id})
            await guildSchema.deleteOne({ "_id" : guild.id})
            await membersSchema.deleteOne({ "_id" : guild.id})
            await rolesSchema.deleteOne({ "_id" : guild.id})
            await ticketSchema.deleteOne({ "_id" : guild.id})
        } catch (error) {
            console.log(error)
        }
        await dbdisconnect()
        console.log("Left a guild: " + guild.name);
    }
};