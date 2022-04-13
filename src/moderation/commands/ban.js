module.exports = {
    name: "ban",
    command:"ban",
    desc:'Bot will ban a member!',
    example:"/moderation ban",
    async execute(interaction,lang,fields) {
        var member = interaction.options? await interaction.guild.members.fetch(interaction.options.getUser("user")) : interaction.guild.members.cache.find(member=> "<@"+member.id+">" == fields[0].value);
        var reason = interaction.options? interaction.options.getString("reason") : fields.length>2? fields[3] : null;
        interaction.guild.members.ban(member)
        if (reason!=null) {
            var string = lang.get(interaction.guild.lang).commands.moderation["optMemberBanReason"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            result = string.replace("${reason}",`${reason}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.lang).commands.moderation["optMemberBan"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
    }
};