const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(interaction,lang) {
        var textLeave = interaction.fields.getTextInputValue('textInput')
        interaction.guild.settings.plugins.leaverPlugin.textLeaver = textLeave
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: interaction.member.guild.id,
            }, {
                $set: {
                    "plugins.leaverPlugin.textLeaver": textLeave,
                }
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        var updateEmbed = interaction.message.embeds[0]
        updateEmbed.fields[0].name = lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin["text"]+` \`${textLeave}\``
        await interaction.message.edit({embeds:[updateEmbed]})
        await interaction.editReply({ content: lang.get(interaction.guild.settings.lang).settings.plugins.leaverPlugin["text"] +` ${textLeave}.`, ephemeral: true })
        console.log(`Changed leaver text in ${interaction.guild.name}`)  
	}
};
