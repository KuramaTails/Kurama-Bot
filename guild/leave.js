const createcanvas = require('../events/createcanvas');
const welcomeSchema = require('../schemas/welcome-schema');
module.exports = {
    async execute(member,add) {
        var selectGuildLeave = await welcomeSchema.find({ "_id" : member.guild.id})
        console.log(selectGuildLeave)
        var leaveText
        var leaveBackground
        var selectedChannel
        if (!selectGuildLeave[0]) {return}
        if (selectGuildLeave[0].activeLeave==true) {
            if (!selectGuildLeave[0].channelId) {
                return
            }
            else {
                selectedChannel = await member.guild.channels.resolve(selectGuildLeave[0].channelId)
                if (!selectGuildLeave[0].textLeave) {
                    return selectedChannel.send("Please select a text to have inside your leave message")
                }
                else {
                    leaveText = selectGuildLeave[0].textLeave
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
