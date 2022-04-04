const dbconnect = require('../db/dbconnect');
const dbdisconnect = require("../db/dbdisconnect")
const welcomeSchema = require("../schemas/welcome-schema");

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
        updateEmbed.fields[0].name = lang.get(interaction.guild.lang).update.welcomer.text["welcomer"] + `  \`${textWelcome}\``
        await selectedMessage.edit({embeds:[updateEmbed]})
        await modal.deferReply({ ephemeral: true });
        await modal.editReply({ content: lang.get(interaction.guild.lang).update.welcomer.text["welcomer"]+ `${textWelcome}.`, ephemeral: true })  
        console.log(`Changed welcomer text in ${modal.guild.name}`)  
	}
};
