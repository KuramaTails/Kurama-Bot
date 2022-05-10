const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const guildSchema = require("../../schemas/guild-schema");

module.exports = {
    name: "skip",
    command:"skip",
    desc:'Bot will skip this song!',
    example:"/player skip",
	async execute(interaction,player,lang,voiceChannel,playerUser) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            var countMembers = Array.from(voiceChannel.members.keys())
            if (!playerUser.has(interaction.guild.id)) {
                playerUser.set(interaction.guild.id,[interaction.user.id]);
            }
            else {
                if (!playerUser.get(interaction.guild.id).find(id =>id==interaction.user.id)) {
                    playerUser.get(interaction.guild.id).push(interaction.user.id)
                }
            }
            if (playerUser.get(interaction.guild.id).length<countMembers.length/2) {
                var memberLeft= countMembers.length/2-playerUser.get(interaction.guild.id).length
                console.log(memberLeft)
                var string = lang.get(interaction.guild.settings.lang).player.commands.errors["skip"]
                let result = string.replace("${memberLeft}",memberLeft);
                return interaction.followUp({content: result ,ephemeral: true})
            }
        }
        if (player.queues.collection.first().songs.length>1) {
            player.skip(voiceChannel)
            interaction.followUp({
                content: lang.get(interaction.guild.settings.lang).player.commands["skip"],
                ephemeral: true
                })
        }
        else {
            var vol = player.getQueue(voiceChannel)? player.getQueue(voiceChannel).volume : 50
            interaction.guild.settings.plugins.playerPlugin.volume = vol
            await dbconnect()
            await guildSchema.findOneAndUpdate({
                _id: interaction.guild.id,
            }, {
                $set: {
                    "plugins.playerPlugin.volume":  vol,
                }
            },
            {
                upsert:true,
            })
            await dbdisconnect()
            await player.voices.leave(voiceChannel)
            interaction.followUp({
                content: lang.get(interaction.guild.settings.lang).player.commands.errors["queue"],
                ephemeral: true
                })
        }
    }
};