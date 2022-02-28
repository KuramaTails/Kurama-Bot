module.exports = {
	name: "clear",
	ephemeral: "false",
	command:"Clear",
	desc:"Clear chat",
    example:"!clear <max 100 messages>",
	async execute(messageCreate, args) {
     const fetched = args;
     if (fetched<100){
        const selected = await messageCreate.channel.messages.fetch(fetched);
        messageCreate.channel.bulkDelete(selected);
     }
     else {
         messageCreate.reply("Please select less then 100 messages")
     }
    }
};