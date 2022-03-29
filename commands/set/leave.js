const dbdisconnnect = require('../../db/dbdisconnnect');
const dbconnect = require('../../db/dbconnect');
const welcomeSchema = require('../../schemas/welcome-schema');

module.exports = {
	async execute(interaction) {
        await dbconnect()
        switch (true) {
            case interaction.options.getBoolean("activeleave")!=null:
                var activeLeave =interaction.options.getBoolean("activeleave")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    activeLeave,
                },
                {
                    upsert:true,
                })
            break;
            case interaction.options.getString("textleave")!=null:
                var textLeave = interaction.options.getString("textleave")
                await welcomeSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    _id: interaction.guild.id,
                    textLeave,
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