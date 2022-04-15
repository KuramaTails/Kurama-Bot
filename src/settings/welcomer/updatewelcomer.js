const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnect = require("../../misc/db/dbdisconnect")
const welcomeSchema = require("../../schemas/welcome-schema");

module.exports = {
	async execute(modal,lang) {
        await dbconnect()
        var textWelcome = modal.getTextInputValue('textinput-customid')
        await welcomeSchema.findOneAndUpdate({
            _id: modal.member.guild.id,
            }, {
                textWelcome
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        var selectChannel = await modal.guild.channels.resolve(modal.channelId)
        var selectedMessage = await selectChannel.messages.resolve(modal.message.id)
        var updateEmbed = selectedMessage.embeds[0]
        updateEmbed.fields[0].name = lang.get(modal.guild.lang).update.welcomer["text"] + `  \`${textWelcome}\``
        await selectedMessage.edit({embeds:[updateEmbed]})
        await modal.editReply({ content: lang.get(modal.guild.lang).update.welcomer["text"]+ ` ${textWelcome}.`, ephemeral: true })  
        console.log(`Changed welcomer text in ${modal.guild.name}`)  
	}
};