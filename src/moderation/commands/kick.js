module.exports = {
    name: "kick",
    command:"kick",
    desc:'Bot will kick a member!',
    example:"/moderation kick",
    async execute(interaction,lang,fields) {
        var member = interaction.options? await interaction.guild.members.fetch(interaction.options.getUser("user")) : interaction.guild.members.cache.find(member=> "<@"+member.id+">" == fields[0].value);
        var reason = interaction.options? interaction.options.getString("reason") : fields.length>2? fields[3].value : null;
        interaction.guild.members.kick(member)
        if (reason!=null) {
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optMemberKickReason"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            result = result.replace("${reason}",`${reason}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            var string = lang.get(interaction.guild.settings.lang).commands.moderation["optMemberKick"]
            let result = string.replace("<@${member.id}>",`<@${member.id}>`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
    }
};