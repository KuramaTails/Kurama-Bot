const ticketSchema = require("../schemas/ticket-schema")
const ticketstart = require("./ticketstart")

module.exports= {
    async execute(interaction,lang,customId) {
        await dbconnect()
        var selectGuild = await ticketSchema.find({ "_id" : interaction.guild.id})
        switch (customId) {
            case "create":
                var i = selectGuild[0]? selectGuild[0].counter+1:0
                var index = "" + i
                var pad = "0000"
                var ans = pad.substring(0, pad.length - index.length) + index
                await ticketSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    counter:ans
                },
                {
                    upsert:true,
                })
                await interaction.deferUpdate()
                await ticketstart.execute(interaction,lang,ans)
            break;
            case "close":
                await interaction.deferUpdate()
                setTimeout(() => {
                    interaction.channel.delete()
                }, 5*1000);
            break;
        }
        await dbdisconnect()
    }
}