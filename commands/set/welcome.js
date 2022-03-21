const dbdisconnnect = require('../../db/dbdisconnnect');
const dbconnect = require('../../db/dbconnect');
const welcomeSchema = require('../../schemas/welcome-schema')
module.exports = {
	async execute(interaction) {
        await dbconnect()
        switch (true) {
            case interaction.options.getBoolean("active")!=null:
                var active =interaction.options.getBoolean("active")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    active,
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
            case interaction.options.getString("text")!=null:
                var text = interaction.options.getString("text")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    _id: interaction.guild.id,
                    text,
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
            content: "Welcomer has been set",
            ephemeral: true
        })
	},
};