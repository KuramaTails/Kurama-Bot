module.exports = {
    name: "clear",
    command:"clear",
    desc:'Bot will clear messages in this channel!',
    example:"/moderation clear <number>",
    async execute(interaction) {
        var number = (interaction.options.getNumber("number"));
        if (number<101){
            interaction.channel.bulkDelete(number,true);
            interaction.followUp({
                content: `${number} messages deleted`,
                ephemeral: true
            })
        }
        else {
            interaction.followUp({
                content: "Please select less then 100 messages",
                ephemeral: true
            })
        }        
    }
};