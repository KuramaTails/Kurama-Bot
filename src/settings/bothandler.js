const dbconnect = require("../misc/db/dbconnect")
const dbdisconnect = require("../misc/db/dbdisconnect")
const guildSchema = require("../schemas/guild-schema")
const createadminzone = require("./create/adminzone")
const createautorolechannel = require("./create/autorolechannel")
const createticketzone = require("./create/ticketzone")
const createtwitchzone = require("./create/twitchzone")

module.exports = {
    async execute(interaction,lang,customId) {
        await dbconnect()
        switch (customId) {
            case "adminZone":
                await interaction.deferUpdate()
                await createadminzone.execute(interaction,lang)
            break;
            case "autoRoleZone":
                await interaction.deferUpdate()
                await createautorolechannel.execute(interaction,lang)
            break;
            case "ticketZone":
                await interaction.deferUpdate()
                await createticketzone.execute(interaction,lang)
            break;
            case "twitchZone":
                await interaction.deferUpdate()
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


/*
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
*/