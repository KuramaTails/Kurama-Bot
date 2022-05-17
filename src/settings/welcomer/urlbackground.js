const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");


module.exports = {
	async execute(interaction,lang) {
        var urlBackground = interaction.fields.getTextInputValue('textInput')
        if (!urlBackground.includes('.jpg') && !urlBackground.includes('.png') ) {
            return await interaction.editReply({ content: 'error url', ephemeral: true })
        }
        interaction.guild.settings.plugins.welcomerPlugin.background = urlBackground
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: interaction.guild.id,
            }, {
                $set: {
                    "plugins.welcomerPlugin.background": urlBackground,
                }
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        await interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerBackgroundSet"], ephemeral: true })
        console.log(`Changed welcomer background in ${interaction.guild.name}`)  
	}
};