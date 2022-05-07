const { MessageEmbed } = require("discord.js");
const dbconnect = require("../../db/dbconnect")
const dbdisconnect = require("../../db/dbdisconnect")
const membersSchema = require("../../schemas/members-schema")
module.exports = {
    name: "clearwarn",
    command:"clearwarn",
    desc:'Bot will clear warn of this member!',
    example:"/moderation clear <number>",
    async execute(interaction,lang) {
        await dbconnect()
        var dbmembers = await membersSchema.findOne({_id: interaction.guild.id})
        if (!dbmembers) return
        if (interaction.options.getUser("user")) {
            var member = interaction.options.getUser("user")
            if (!dbmembers.members.get(member.id)) {
                var memberId= member.id
                var roles = member.roles.cache
                var rolesKeys = Array.from(roles.keys())
                var memberObj = {
                    bot:member.user.bot,
                    username:member.user.username,
                    roles:rolesKeys,
                    warn:0,
                }
                dbmembers.members.set(memberId,memberObj)
            }
            else {
                dbmembers.members.get(member.id).warn = 0
            }
            interaction.followUp({
                content: `warn cleared for <@${member.id}>`,
                ephemeral: true
            })
        }
        else {
            for (const member of dbmembers.members) {
                dbmembers.members.get(member[0]).warn=0
            }
            interaction.followUp({
                content: `warn cleared in ${interaction.guild.name}`,
                ephemeral: true
            })
        }
        dbmembers.markModified('members');
        await dbmembers.save()
        await dbdisconnect()
    }
};