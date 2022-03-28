const createcanvas = require('../create/createcanvas');
module.exports = {
    async execute(member,add,selectGuildWelcomer) {
        if (!selectGuildWelcomer[0].channelId) {
            return
        }
        var selectedChannel = await member.guild.channels.resolve(selectGuildWelcomer[0].channelId)
        if (!selectGuildWelcomer[0].textWelcome) {
            return selectedChannel.send("Please select a text to have inside your welcome message in #welcomer-setting")
        }
        else {
            if (!selectGuildWelcomer[0].background) {
                return selectedChannel.send("Please select a background for your welcome message in #welcomer-setting")
            }  
            await createcanvas.execute(member,selectGuildWelcomer,selectedChannel,add)
        }
    }
};
