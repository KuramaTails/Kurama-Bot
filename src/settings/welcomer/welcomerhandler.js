const dbconnect = require("../../misc/db/dbconnect")
const dbdisconnect = require("../../misc/db/dbdisconnect")
const modallayout = require("../../modal/modallayout")
const welcomeSchema = require("../../schemas/welcome-schema")
const activeleaver = require("../leaver/activeleaver")
const activewelcomer = require("./activewelcomer")

module.exports= {
    async execute(interaction,bot,lang,customId) {
        try {
            switch (customId) {
                case "textWelcomer":
                    var customId="modal-"+customId
                    var title ='Set Welcomer Text!'
                    var label='Please enter welcomer text here'
                    var placeHolder='Write a text here'
                    modallayout.execute(interaction,bot,customId,title,label,placeHolder)
                return;
                case "textLeaver":
                    var customId="modal-"+customId
                    var title ='Set Leaver Text!'
                    var label='Please enter leave text here'
                    var placeHolder='Write a text here'
                    modallayout.execute(interaction,bot,customId,title,label,placeHolder)
                return;
                case "selectWelcomerChannel":
                        var selectedChannelId = interaction.values[0]
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            channelId:selectedChannelId
                        },
                        {
                            upsert:true,
                        })
                        interaction.reply({
                            content: lang.get(interaction.guild.lang).settings["welcomerChannelSet"],
                            ephemeral: true
                        })
                break;
                case "selectWelcomerBackground":
                    var background = interaction.values[0]
                    await welcomeSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                    }, {
                        background
                    },
                    {
                        upsert:true,
                    })
                    interaction.reply({
                        content: lang.get(interaction.guild.lang).settings["welcomerBackgroundSet"],
                        ephemeral: true
                    })
                break;
            }
            await dbconnect()
            switch (customId) {
                case "enableWelcomer":
                    await welcomeSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                    }, {
                        activeWelcome:true,
                    },
                    {
                        upsert:true,
                    })
                    await interaction.deferUpdate()
                    await activewelcomer.execute(interaction,lang)
                break;
                case "disableWelcomer":
                    await welcomeSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                    }, {
                        activeWelcome:false,
                        activeLeave:false,
                        channelId: null,
                        background: null,
                        textWelcome:null,
                        textLeave: null,
                    },
                    {
                        upsert:true,
                    })
                    await interaction.deferUpdate()
                    await activewelcomer.execute(interaction,lang)
                break;
                case "enableLeaver":
                    await welcomeSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                    }, {
                        activeLeave:true,
                    },
                    {
                        upsert:true,
                    })
                    await interaction.deferUpdate()
                    await activeleaver.execute(interaction,lang)
                break;
                case "disableLeaver":
                    await welcomeSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                    }, {
                        activeLeave:false,
                        textLeave: null,
                    },
                    {
                        upsert:true,
                    })
                    await interaction.deferUpdate()
                    await activeleaver.execute(interaction,lang)
                break;
                
            }
            await dbdisconnect()
        } catch (error) {
            console.log(error)
        }
    }
}