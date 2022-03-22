const welcomeSchema= require ('../schemas/welcome-schema')
const createcanvas = require('../events/createcanvas');
module.exports = {
    async execute(member,add) {
        var selectGuildwelcome = await welcomeSchema.find({ "_id" : member.guild.id})
        var welcomeText
        var welcomeBackground
        var selectedChannel
        if (!selectGuildwelcome) {return}
        if (selectGuildwelcome[0].activeWelcome==true) {
            if (!selectGuildwelcome[0].channelId) {
                return
            }
            else {
                selectedChannel = await member.guild.channels.resolve(selectGuildwelcome[0].channelId)
                if (!selectGuildwelcome[0].textWelcome) {
                    return selectedChannel.send("Please select a text to have inside your welcome message")
                }
                else {
                    welcomeText = selectGuildwelcome[0].textWelcome
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
        let selrole = member.guild.roles.cache.find(role => role.name === "Member")
        member.roles.add(selrole)
    }
};
