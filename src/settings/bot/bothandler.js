const dbconnect = require("../../misc/db/dbconnect")
const dbdisconnect = require("../../misc/db/dbdisconnect")
const autoroleSchema = require("../../schemas/autorole-schema")
const guildSchema = require("../../schemas/guild-schema")
const botsettings = require("../botsettings")
const createticketzone = require("../ticket/createticketzone")

module.exports = {
    async execute(interaction,lang,customId) {
        await dbconnect()
        switch (customId) {
            case "enableAutorole":
                await autoroleSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    active:true,
                },
                {
                    upsert:true,
                })
                await interaction.deferUpdate()
                await botsettings.execute(interaction,lang)
            break;
            case "disableAutorole":
                await autoroleSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    active:false,
                },
                {
                    upsert:true,
                })
                await interaction.deferUpdate()
                await botsettings.execute(interaction,lang)
            break;
            case "ticketZone":
                createticketzone.execute(interaction,lang)
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
            case "selectAutoroleRole":
                var role = interaction.values[0]
                await autoroleSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    roleId: role
                },
                {
                    upsert:true,
                })
                interaction.reply({
                    content: lang.get(interaction.guild.lang).settings["autoRoleSet"]+` <@&${interaction.values[0]}>`,
                    ephemeral: true
                })
            break;
        }
        await dbdisconnect()
    }
}
