const createcanvas = require('../create/createcanvas');
module.exports = {
    async execute(member,add,selectGuildWelcomer) {
        if (!selectGuildwelcome[0].channelId) {
            return
        }
        else {
            var selectedChannel = await member.guild.channels.resolve(selectGuildwelcome[0].channelId)
            if (!selectGuildwelcome[0].textWelcome) {
                return selectedChannel.send("Please select a text to have inside your welcome message in #welcomer-setting")
            }
            else {
                if (!selectGuildwelcome[0].background) {
                    return selectedChannel.send("Please select a background for your welcome message in #welcomer-setting")
                }        
                await createcanvas.execute(member,selectGuildWelcomer,selectedChannel,add)
            }
        }
    }
};
