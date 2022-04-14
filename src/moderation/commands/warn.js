const { MessageEmbed } = require("discord.js");
const dbconnect = require("../../misc/db/dbconnect")
const dbdisconnect = require("../../misc/db/dbdisconnect")
const membersSchema = require("../../schemas/members-schema")
module.exports = {
    name: "warn",
    command:"warn",
    desc:'Bot will warn a member!',
    example:"/moderation warn",
    async execute(interaction,lang,fields) {
        var member = interaction.options? await interaction.guild.members.fetch(interaction.options.getUser("user")) : interaction.guild.members.cache.find(member=> "<@"+member.id+">" == fields[0].value);
        var reason = interaction.options? interaction.options.getString("reason") : fields.length>2? fields[3] : null;
        await dbconnect()
        var dbmembers = await membersSchema.findOne({_id: interaction.guild.id})
        var warnCount = dbmembers.members.get(member.id).warn+1
        dbmembers.members.get(member.id).warn = warnCount
        dbmembers.markModified('members');
        await dbmembers.save()
        await dbdisconnect()
        var string = lang.get(interaction.guild.lang).commands.moderation["optWarn"]
        var result = string.replace("${interaction.guild.name}",`${interaction.guild.name}`);
        result = string.replace("${warnCount}",`${warnCount}`);
        const reportedUser = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Bot Kurama : Warning")
        .setURL("https://discord.js.org/#/docs/main/stable/class/MessageEmbed")
        .setDescription(result)
        await member.send({embeds:[reportedUser]}).catch(err=>console.log(err))
    }
};