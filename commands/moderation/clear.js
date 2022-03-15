module.exports = {
    async execute(interaction) {
        var number = (interaction.options.getNumber("number"));
        if (number<101){
            var selected = await interaction.channel.messages.fetch(interaction.options.getUser("user"));
            const selected = await message.channel.messages.fetch(number);
            interaction.message.channel.bulkDelete(selected,true);
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