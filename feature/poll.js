const { MessageEmbed , Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
module.exports = {
	name: "poll",
	ephemeral: "false",
    command:"Poll",
    desc:'You can create a poll',
    categ:"general",
    example:"!poll Title + Option1 + Option2 + etc",
	async execute(messageCreate,args) {
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
        const string = args.join(" ");
        const splittedstring = string.split("+");
        if (splittedstring.length>2)
        {
            const title = splittedstring[0]
            const options = splittedstring.slice(1,splittedstring.length)
            const poll = new MessageEmbed() // Create A New Embed
            .setColor('#0099ff')
            .setTitle(`**__Poll__**`)
            .setDescription(`***${title}*** \n\n You have 30 seconds to reply to this poll \n **Poll created by** *${messageCreate.author.toString()}* \n`)
            for (let i = 0; i < options.length; i++) {
                poll.addFields(
                    { name: "Emoji" , value: emojilist[i], inline: true },
                    { name: 'Option', value: options[i], inline: true },
                    { name: '\u200B', value: "\u200B", inline: true }
                ) 
            }
            messageCreate.reply({ embeds: [poll] })
            .then(poolembed => {
                for (let i = 0; i < options.length; i++) {
                    poolembed.react(emojilist[i]);  
                }
                setTimeout(async () => {
                    var rawresults = [];
                    var results = []
                    for (let i = 0; i < options.length; i++) {
                        rawresults[i] = await poolembed.reactions.resolve(emojilist[i]).users.fetch();
                        results[i] = Array.from(rawresults[i].keys()).length-1
                    }
                    const resultspoll = new MessageEmbed() // Create A New Embed
                    .setColor('#0099ff')
                    .setTitle(`**__Poll__**`)
                    .setDescription(`***${title}*** \n\n You have 30 seconds to reply to this poll \n **Poll created by** *${messageCreate.author.toString()}* \n`)
                    for (let i = 0; i < options.length; i++) {
                        resultspoll.addFields(
                            { name: "Count" , value: `***${results[i]}***`, inline: true },
                            { name: 'Option', value: options[i], inline: true },
                            { name: '\u200B', value: "\u200B", inline: true }
                        )      
                    }
                    poolembed.delete();
                    messageCreate.reply( {content:`Poll ended! Thank you for your participation.\nFollowing are the results:`, embeds: [resultspoll]})
                }, 30000);  
            })
        }
        else {
            messageCreate.reply("Please provide some options for poll (Use + for divide them)")
        }
	},
};