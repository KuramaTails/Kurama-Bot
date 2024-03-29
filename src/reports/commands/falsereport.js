const { MessageEmbed } = require("discord.js");
const dbconnect = require("../../db/dbconnect");
const dbdisconnect = require("../../db/dbdisconnect");
const membersSchema= require("../../schemas/members-schema");
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
        var string = lang.get(interaction.guild.settings.lang).zones.adminZone.reports.commands["falseReportdesc"]
        var result = string.replace("${interaction.guild.name}",`${interaction.guild.name}`);
        result = result.replace("${warnCount}",`${warnCount}`);
        const reportedUser = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Warning")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(result)
        await member.send({embeds:[reportedUser]}).catch(err=>console.log(err))
    }
}