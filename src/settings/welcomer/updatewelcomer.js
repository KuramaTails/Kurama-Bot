const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");


module.exports = {
	async execute(modal,lang) {
        var textWelcomer = modal.getTextInputValue('textinput-customid')
        modal.guild.settings.plugins.leaverPlugin.textWelcomer = textWelcomer
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: modal.member.guild.id,
            }, {
                $set: {
                    "plugins.leaverPlugin.textWelcomer": textWelcomer,
                }
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        var updateEmbed = modal.message.embeds[0]
        updateEmbed.fields[0].name = lang.get(modal.guild.settings.lang).settings.plugins.welcomerPlugin["text"]+` \`${textWelcomer}\``
        await modal.message.edit({embeds:[updateEmbed]})
        await modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.welcomerPlugin["text"] +` ${textWelcomer}.`, ephemeral: true })
        console.log(`Changed welcomer text in ${modal.guild.name}`)  
	}
};