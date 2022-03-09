const { Permissions, MessageEmbed } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);
const channelpermissions = new Permissions([
    Permissions.FLAGS.SEND_MESSAGES,
]);

module.exports = {
	name: "createwelcomechannel",
	ephemeral: "false",
	command:"CreateWelcomeChannel",
	desc:"Create channels for welcome new users",
    example:"!createroleschannel",
	async execute(messageCreate, args,bot) {
        if (!messageCreate.member.permissions.has(permissions)) {
            messageCreate.reply("You are not an Administrator!"); return;
        }
        var guild = await messageCreate.guild.channels;
        var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Add Role')
        .setAuthor({ name: 'Command : Add Role', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(`Choose a reaction for receiving a role`)
        var roles = await messageCreate.guild.roles.fetch()
        let everyone = messageCreate.guild.roles.cache.find(r => r.name === "@everyone");
        let keys = Array.from( roles.keys() );
        const filteredkeys = []
        for (let i = 0; i < keys.length; i++) {
            if (!roles.get(keys[i]).managed ){
                if (roles.get(keys[i]).name != "@everyone"){
                    if (roles.get(keys[i]).permissions.has(permissions)) {
                        filteredkeys.push(keys[i])
                    }
                }
            }
        }
        if (filteredkeys.length<10){
            var emojilist = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
        }
        else {
            return messageCreate.reply("There was an error. Please contact an Admin") 
        }
        for (let i = 0; i < filteredkeys.length; i++) {
            if (!roles.get(filteredkeys[i]).managed ){
                if (roles.get(filteredkeys[i]).name != "@everyone"){
                    roles.get(filteredkeys[i]).emoji = emojilist[i]
                    exampleEmbed.addFields(
                        { name: "Emoji" , value: roles.get(filteredkeys[i]).emoji, inline: true },
                        { name: 'Description', value: roles.get(filteredkeys[i]).name, inline: true },
                        { name: '\u200B', value: "\u200B", inline: true })
                }
            }
        }
        guild.create('Welcomer', {
            type: 'GUILD_CATEGORY',
            position: 0,
            permissionOverwrites: [
                {
                id: everyone.id,
                deny: [channelpermissions],
            },
            ],
        })
        .then(cat => {
            guild.create(`welcome`,  {type: 'GUILD_TEXT',parent: cat});
            guild.create(`Choose-role`,  {type: 'GUILD_TEXT',parent: cat,})
            .then(roleschannel => {
                    roleschannel.send({ embeds: [exampleEmbed] }).then(embedMessage => {
                    for (let i = 0; i < filteredkeys.length; i++) {
                        embedMessage.react(roles.get(filteredkeys[i]).emoji);  
                    }
                })
            });  
        });
    }
};