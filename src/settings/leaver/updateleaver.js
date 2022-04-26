const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
	async execute(modal,lang) {
        var textLeave = modal.getTextInputValue('textinput-customid')
        modal.guild.settings.plugins.leaverPlugin.textLeaver = textLeave
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: modal.member.guild.id,
            }, {
                $set: {
                    "plugins.leaverPlugin.textLeaver": textLeave,
                }
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        var updateEmbed = modal.message.embeds[0]
        updateEmbed.fields[0].name = lang.get(modal.guild.settings.lang).update.leaver["text"]+` \`${textLeave}\``
        await modal.message.edit({embeds:[updateEmbed]})
        await modal.editReply({ content: lang.get(modal.guild.settings.lang).update.leaver["text"] +` ${textLeave}.`, ephemeral: true })
        console.log(`Changed leaver text in ${modal.guild.name}`)  
	}
};
