const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");


module.exports = {
	async execute(interaction,lang) {
        var textWelcomer = interaction.fields.getTextInputValue('textInput')
        interaction.guild.settings.plugins.welcomerPlugin.textWelcomer = textWelcomer
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: interaction.member.guild.id,
            }, {
                $set: {
                    "plugins.welcomerPlugin.textWelcomer": textWelcomer,
                }
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        var updateEmbed = interaction.message.embeds[0]
        updateEmbed.fields[0].name = lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["text"]+` \`${textWelcomer}\``
        await interaction.message.edit({embeds:[updateEmbed]})
        await interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.welcomerPlugin["text"] +` ${textWelcomer}.`, ephemeral: true })
        console.log(`Changed welcomer text in ${interaction.guild.name}`)  
	}
};