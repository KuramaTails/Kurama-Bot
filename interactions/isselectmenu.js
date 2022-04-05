const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require('../db/dbdisconnect');

const playerSchema = require('../schemas/player-schema');
const welcomeSchema = require('../schemas/welcome-schema');
const autoroleSchema = require('../schemas/autorole-schema');

const createplayerembed = require('../create/createplayerembed');
const createplayersettings = require('../create/createplayersettings');
const createplayersettingsembed = require('../create/createplayersettingsembed');
const part6 = require('../tutorial/part6');

module.exports = {
	async execute(interaction,lang) {
        var separateCustomId = interaction.customId.split("-")
        await dbconnect()
        switch (separateCustomId[0]) {
            case "tutorial":
                var selectedChannelId = interaction.values[0]
            
                await playerSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    channelId:selectedChannelId
                },
                {
                    upsert:true,
                })
            
                await createplayerembed.execute(interaction.guild,selectedChannelId,lang)
                await createplayersettings.execute(interaction)
                await createplayersettingsembed.execute(interaction,lang)
                await part6.execute(interaction,lang)
            break;
            case "welcomer":
                switch (separateCustomId[1]) {
                    case "selectWelcomerChannel":
                        var selectedChannelId = interaction.values[0]
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            channelId:selectedChannelId
                        },
                        {
                            upsert:true,
                        })
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).settings["welcomerChannelSet"],
                            ephemeral: true
                        })
                    break;
                    case "selectWelcomerBackground":
                        var background = interaction.values[0]
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            background
                        },
                        {
                            upsert:true,
                        })
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).settings["welcomerBackgroundSet"],
                            ephemeral: true
                        })
                    break;
                }
            break;
            case "player":
                var selectedChannelId = interaction.values[0]
                await playerSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    channelId:selectedChannelId
                },
                {
                    upsert:true,
                })
                await createplayerembed.execute(interaction.guild,selectedChannelId,lang)
            break;
            case "bot":
                switch (separateCustomId[1]) {
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
            break;
        }
        await dbdisconnnect() 
	}
};