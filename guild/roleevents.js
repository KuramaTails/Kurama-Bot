const {  MessageButton, MessageActionRow } = require("discord.js");
const dbconnect = require("../db/dbconnect");
const dbdisconnnect = require("../db/dbdisconnect");
const fetchroles = require("../fetch/fetchroles");
const rolesSchema = require("../schemas/roles-schema");
module.exports = {
	async execute(role) {
        try {
            var guild = await role.guild
            let selChannel = await guild.channels.cache.find(channel => channel.name.includes("choose-role"))
            var allMessages = await selChannel.messages.fetch()
            let selMessage = await allMessages.find(message => message.embeds[0] != null)
            let moderationCommandId = await guild.commands.cache.find(command => command.name === "moderation").id
            var permissions = []
            
            if (role.permissions.has("ADMINISTRATOR")) {
                permissions = [{
                    id: role.id,
                        type: 'ROLE',
                        permission: true,
                }];
            }
            else {
                permissions = [{
                    id: role.id,
                        type: 'ROLE',
                        permission: false,
                }];
            }
            await guild.commands.permissions.add({ command: moderationCommandId,permissions: permissions})
                .then(console.log(`Set permissions in ${role.guild.name}`))
                .catch(console.error);
            await dbconnect()
            await fetchroles.execute(role.guild)
            var selectGuildRoles = await rolesSchema.find({ "_id" : role.guild.id})
            await dbdisconnnect()
            var keysRoles = Array.from(selectGuildRoles[0].roles.keys())
            var buttons = [new MessageActionRow()]
            for (let i = 0; i < keysRoles.length; i++) {
                var role = await selectGuildRoles[0].roles.get(keysRoles[i])
                if (role.admin!= true) {
                    if (role.managed!= true) {
                        if(role.name != "@everyone") {
                            if (buttons[buttons.length-1].components.length<5) {
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`${keysRoles[i]}`)
                                        .setLabel(`${role.name}`)
                                        .setStyle("PRIMARY"),
                                ); 
                            }
                            else {
                                buttons[buttons.length] = new MessageActionRow()
                                buttons[buttons.length-1].addComponents(
                                    new MessageButton()
                                        .setCustomId(`${keysRoles[i]}`)
                                        .setLabel(`${role.name}`)
                                        .setStyle("PRIMARY"),
                                );
                            }
                        }
                    }
                }
            }
            switch (buttons.length-1) {
                case 0:
                    selMessage.edit({components: [buttons[0]]})
                break;
                case 1:
                    selMessage.edit({components: [buttons[0],buttons[1]]})
                break;
                case 2:
                    selMessage.edit({components: [buttons[0],buttons[1],buttons[2]]})
                break;
                case 3:
                    selMessage.edit({components: [buttons[0],buttons[1],buttons[2],buttons[3]]})
                break;
                case 4:
                    selMessage.edit({components: [buttons[0],buttons[1],buttons[2],buttons[3],buttons[4]]})
                break;
            }
            console.log(`Roles updated in ${guild.name}`)
        } catch (error) {
            console.log(error)
        }
    }
};
