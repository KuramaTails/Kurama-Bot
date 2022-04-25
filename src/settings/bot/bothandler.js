const dbconnect = require("../../db/dbconnect")
const dbdisconnect = require("../../db/dbdisconnect")
const guildSchema = require("../../schemas/guild-schema")
const createadminzone = require("./create/adminzone")
const createautorolechannel = require("./create/autorolechannel")
const createticketzone = require("./create/ticketzone")
const createtwitchzone = require("./create/twitchzone")

module.exports = {
    async execute(interaction,customId,lang) {
        await dbconnect()
        switch (customId) {
            case "adminZone":
                await interaction.deferUpdate()
                await createadminzone.execute(interaction,lang)
            break;
            case "autoroleChannel":
                await interaction.deferUpdate()
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    guildAutorolePluginActive: true
                },
                {
                    upsert:true,
                })
                await createautorolechannel.execute(interaction,lang)
            break;
            case "ticketZone":
                await interaction.deferUpdate()
                await createticketzone.execute(interaction,lang)
            break;
            case "twitchZone":
                await interaction.deferUpdate()
                interaction.guild.settings.twitchPlugin.active= true
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    plugins : {
                        twitchPlugin: {
                            active:true
                        }
                    }
                },
                {
                    upsert:true,
                })
                await createtwitchzone.execute(interaction,lang)
            break;
            default:
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    guildLang: customId
                },
                {
                    upsert:true,
                })
                interaction.guild.lang = customId
                interaction.reply({
                    content: "Language has been set",
                    ephemeral: true
                })
            break;
        }
        await dbdisconnect()
    }
}