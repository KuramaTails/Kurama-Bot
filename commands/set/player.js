const dbconnect = require('../../events/dbconnect');
const playerSchema = require('../../schemas/player-schema')
module.exports = {
	async execute(interaction) {
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
                    content: "Player has been set",
                    ephemeral: true
                })
            }
        })
	},
};