module.exports = {
	name: "clear",
	ephemeral: "false",
	command:"Help",
	desc:"Gives you a list of all commands available",
    example:"!help",
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