module.exports = {
    name: "clear",
    command:"clear",
    desc:'Bot will clear messages in this channel!',
    example:"/moderation clear <number>",
    async execute(interaction,lang) {
        var number = (interaction.options.getNumber("number"));
        if (number<101){
            interaction.channel.bulkDelete(number,true);
            var string = lang.get(interaction.guild.lang).commands.moderation["optClearChat"]
            let result = string.replace("${number}",`${number}`);
            interaction.followUp({
                content: result,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: lang.get(interaction.guild.lang).commands.moderation["optClearChat"],
                ephemeral: true
            })
        }        
    }
};