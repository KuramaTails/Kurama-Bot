const leaveSchema= require ('../schemas/leave-schema')
const createcanvas = require('../events/createcanvas');
module.exports = {
    async execute(member,add) {
        var selectGuildLeave = await leaveSchema.find({ "_id" : member.guild.id})
        var leaveText
        var leaveBackground
        var selectedChannel
        if (!selectGuildLeave[0]) {return}
        if (selectGuildLeave[0].active=true) {
            if (!selectGuildLeave[0].channelId) {
                selectedChannel = await member.guild.channels.cache.find(c => c.type === "GUILD_TEXT");
                return selectedChannel.send("Please select a channel to receive leave messages when a member leaves or disable welcomer")
            }
            else {
                selectedChannel = await member.guild.channels.resolve(selectGuildLeave[0].channelId)
                if (!selectGuildLeave[0].text) {
                    return selectedChannel.send("Please select a text to have inside your leave message")
                }
                else {
                    leaveText = selectGuildLeave[0].text
                }
            }
        }
        else {return}
        if (!selectGuildLeave[0].background) {
            leaveBackground = 'canvas'
        }
        else {
            leaveBackground = selectGuildLeave[0].background
        }

        createcanvas.execute(member,leaveText,selectedChannel,leaveBackground,add)
    }
};
