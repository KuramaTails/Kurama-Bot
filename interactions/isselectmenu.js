const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require('../db/dbdisconnect');

const playerSchema = require('../schemas/player-schema');
const welcomeSchema = require('../schemas/welcome-schema');
const autoroleSchema = require('../schemas/autorole-schema');

const createplayerembed = require('../layout/createplayerembed');
const setplayerchannel = require('../layout/setplayerchannel');
const settingsplayer = require('../settings/settingsplayer');
const part6 = require('../tutorial/part 6');
const deletecooldown = require('../buttons/deletecooldown');

module.exports = {
	async execute(interaction,cooldownUser) {
        if(interaction.customId=="tutorial-SelectPlayerChannel") {
            var selectedChannelId = interaction.values[0]
            await dbconnect()
                await playerSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    channelId:selectedChannelId
                },
                {
                    upsert:true,
                })
            await dbdisconnnect()
            await createplayerembed.execute(interaction.guild,selectedChannelId)
            await setplayerchannel.execute(interaction)
            await settingsplayer.execute(interaction)
            await part6.execute(interaction)
        }
        if(interaction.customId=="selectPlayerChannel") {
            var selectedChannelId = interaction.values[0]
            await dbconnect()
                await playerSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    channelId:selectedChannelId
                },
                {
                    upsert:true,
                })
            await dbdisconnnect()
            await createplayerembed.execute(interaction.guild,selectedChannelId)
        }
        if(interaction.customId=="selectWelcomerChannel") {
            var selectedChannelId = interaction.values[0]
            await dbconnect()
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    channelId:selectedChannelId
                },
                {
                    upsert:true,
                })
            await dbdisconnnect()
            interaction.reply({
                content: `Welcomer channel set`,
                ephemeral: true
            })
        }
        if(interaction.customId=="selectWelcomerBackground") {
            var background = interaction.values[0]
            await dbconnect()
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    background
                },
                {
                    upsert:true,
                })
            await dbdisconnnect()
            interaction.reply({
                content: `Welcomer background set`,
                ephemeral: true
            })
        }
        if(interaction.customId=="selectRoleChannel") {
            var role = interaction.values[0]
            await dbconnect()
                await autoroleSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    roleId: role
                },
                {
                    upsert:true,
                })
            await dbdisconnnect()
            interaction.reply({
                content: `Autorole set to role <@&${interaction.values[0]}>`,
                ephemeral: true
            })
        }
        deletecooldown.execute(interaction,cooldownUser)
	}
};