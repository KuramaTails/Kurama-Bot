const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");


module.exports = {
	async execute(modal,lang) {
        var urlBackground = modal.getTextInputValue('textinput-customid')
        if (!urlBackground.includes('.jpg') && !urlBackground.includes('.png') ) {
            return await modal.editReply({ content: 'error url', ephemeral: true })
        }
        modal.guild.settings.plugins.welcomerPlugin.background = urlBackground
        await dbconnect()
        await guildSchema.findOneAndUpdate({
            _id: modal.guild.id,
            }, {
                $set: {
                    "plugins.welcomerPlugin.background": urlBackground,
                }
            },
            {
                upsert:true,
            })
        await dbdisconnect()
        await modal.editReply({ content: lang.get(modal.guild.settings.lang).settings.plugins.welcomerPlugin["welcomerBackgroundSet"], ephemeral: true })
        console.log(`Changed welcomer background in ${modal.guild.name}`)  
	}
};