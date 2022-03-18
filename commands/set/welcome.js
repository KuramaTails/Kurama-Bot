const dbconnect = require('../../events/dbconnect');
const welcomeSchema = require('../../schemas/welcome-schema')
module.exports = {
	async execute(interaction) {
        await dbconnect().then(async (mongoose)=> {
            try {
                switch (true) {
                    case interaction.options.getBoolean("active")!=null:
                        var active =interaction.options.getBoolean("active")
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            _id: interaction.guild.id,
                            active,
                        },
                        {
                            upsert:true,
                        })
                    break;
                    case interaction.options.getChannel("channel")!=null:
                        var channel = interaction.options.getChannel("channel")
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            _id: interaction.guild.id,
                            channelId:channel,
                        },
                        {
                            upsert:true,
                        })
                    break;
                    case interaction.options.getString("text")!=null:
                        var text = interaction.options.getString("text")
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            _id: interaction.guild.id,
                            text,
                        },
                        {
                            upsert:true,
                        })
                    break;
                    case interaction.options.getBoolean("leaver")!=null:
                        var leaver = interaction.options.getBoolean("leaver")
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            _id: interaction.guild.id,
                            leaver,
                        },
                        {
                            upsert:true,
                        })
                    break;
                    case interaction.options.getString("textleaver")!=null:
                        var leavertext = interaction.options.getString("textleaver")
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            _id: interaction.guild.id,
                            leavertext,
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
                    content: "Welcome has been set",
                    ephemeral: true
                })
            }
        })
	},
};