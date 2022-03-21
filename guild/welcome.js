const welcomeSchema= require ('../schemas/welcome-schema')
const createcanvas = require('../events/createcanvas');
module.exports = {
    async execute(member,add) {
        var selectGuildwelcome = await welcomeSchema.find({ "_id" : member.guild.id})
        var welcomeText
        var welcomeBackground
        var selectedChannel
        if (!selectGuildwelcome) {return}
        if (selectGuildwelcome[0].active=true) {
            if (!selectGuildwelcome[0].channelId) {
                selectedChannel = await member.guild.channels.cache.find(c => c.type === "GUILD_TEXT");
                return selectedChannel.send("Please select a channel to receive welcome messages when a member joins or disable welcomer")
            }
            else {
                selectedChannel = await member.guild.channels.resolve(selectGuildwelcome[0].channelId)
                if (!selectGuildwelcome[0].text) {
                    return selectedChannel.send("Please select a text to have inside your welcome message")
                }
                else {
                    welcomeText = selectGuildwelcome[0].text
                }
            }
        }
        else {return}
        if (!selectGuildwelcome[0].background) {
            welcomeBackground = 'canvas'
        }
        else {
            welcomeBackground = selectGuildwelcome[0].background
        }

        createcanvas.execute(member,welcomeText,selectedChannel,welcomeBackground,add)
        let selrole = member.guild.roles.cache.find(command => command.name === "👤Member")
        member.roles.add(selrole)
    }
};
