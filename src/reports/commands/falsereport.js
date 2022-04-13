const { MessageEmbed } = require("discord.js");
const dbconnect = require("../../misc/db/dbconnect");
const dbdisconnect = require("../../misc/db/dbdisconnect");
const membersSchema = require("../../schemas/members-schema");

module.exports = {
    name: "falsereport",
    command:"falsereport",
    desc:'You can report a user for a false Report!',
    example:"/moderation falsereport",
	async execute(interaction,lang,fields) {
        var member = interaction.options? await interaction.guild.members.fetch(interaction.options.getUser("user")) : interaction.guild.members.cache.find(member=> "<@"+member.id+">" == fields[1].value);
        var reason = interaction.options? interaction.options.getString("reason") : fields.length>2? fields[3] : null;
        await dbconnect()
        var dbmembers = await membersSchema.findOne({_id: interaction.guild.id})
        var warnCount = dbmembers.members.get(member.id).warn+1
        dbmembers.members.get(member.id).warn = warnCount
        dbmembers.markModified('members');
        await dbmembers.save()
        await dbdisconnect()
        const reportedUser = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Warning")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(`You have been warned in ${interaction.guild.name} for a false report! This is your ${warnCount}th warn. Be careful with reports commands. If you continue to break server's rules admin could be take more severe actions against you. \n ***If you think this was wrong warn please contact an admin!***`)
        await member.send({embeds:[reportedUser]}).catch(err=>console.log(err))
    }
}