const dbconnect = require('../../events/dbconnect');
const playerSchema = require('../../schemas/player-schema')
module.exports = {
	async execute(interaction,lang) {
        await dbconnect().then(async (mongoose)=> {
            try {
                switch (true) {
                    case interaction.options.getChannel("channel")!=null:
                        var channel =interaction.options.getChannel("channel")
                        await playerSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            _id: interaction.guild.id,
                            channelId:channel,
                        },
                        {
                            upsert:true,
                        })
                    break;
                }
            } finally {
                mongoose.connection.close()
                console.log("Disconnected from database")
                interaction.followUp({
                    content: lang.get(interaction.guild.lang).settings["playerSet"],
                    ephemeral: true
                })
            }
        })
	},
};