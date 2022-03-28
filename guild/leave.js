const createcanvas = require('../create/createcanvas');
module.exports = {
    async execute(member,add,selectGuildWelcomer) {
        console.log(selectGuildWelcomer)
        if (!selectGuildWelcomer[0].channelId) {
            return
        }
        var selectedChannel = await member.guild.channels.resolve(selectGuildWelcomer[0].channelId)
        if (!selectGuildWelcomer[0].textLeave) {
            return selectedChannel.send("Please select a text to have inside your leave message in #welcomer-setting")
        }
        else {
            if (!selectGuildWelcomer[0].background) {
                return selectedChannel.send("Please select a background for your leave message in #welcomer-setting")
            }        
            await createcanvas.execute(member,selectGuildWelcomer,selectedChannel,add)
        }
    }
};