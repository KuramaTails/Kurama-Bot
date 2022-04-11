const dbdisconnnect = require('../../db/dbdisconnnect');
const dbconnect = require('../../misc/db/dbconnect');
const welcomeSchema = require('../../schemas/welcome-schema')
module.exports = {
	async execute(interaction,lang) {
        await dbconnect()
        switch (true) {
            case interaction.options.getBoolean("activewelcome")!=null:
                var activeWelcome =interaction.options.getBoolean("activewelcome")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    activeWelcome,
                },
                {
                    upsert:true,
                })
            break;
            case interaction.options.getChannel("channel")!=null:
                var channel = interaction.options.getChannel("channel")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    channelId:channel,
                },
                {
                    upsert:true,
                })
            break;
            case interaction.options.getString("textwelcome")!=null:
                var textWelcome = interaction.options.getString("textwelcome")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    _id: interaction.guild.id,
                    textWelcome,
                },
                {
                    upsert:true,
                })
            break;
            case interaction.options.getString("background")!=null:
                var background = interaction.options.getString("background")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    _id: interaction.guild.id,
                    background,
                },
                {
                    upsert:true,
                })
            break;
        }
        await dbdisconnnect()
        await interaction.followUp({
            content: lang.get(interaction.guild.lang).settings["welcomerSet"],
            ephemeral: true
        })
	},
};