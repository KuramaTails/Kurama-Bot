const createcanvas = require('../misc/createcanvas');
module.exports = {
    async execute(member,add,selectGuildWelcomer,lang) {
        if (!selectGuildWelcomer[0].channelId) {
            return
        }
        var selectedChannel = await member.guild.channels.resolve(selectGuildWelcomer[0].channelId)
        switch (add) {
            case false:
                if (!selectGuildWelcomer[0].textLeave) {
                    return selectedChannel.send("Please select a text to have inside your leave message in #welcomer-setting")
                }
                else {
                    if (!selectGuildWelcomer[0].background) {
                        return selectedChannel.send("Please select a background for your leave message in #welcomer-setting")
                    }        
                }
            break;
            case true:
                if (!selectGuildWelcomer[0].textWelcome) {
                    return selectedChannel.send("Please select a text to have inside your welcome message in #welcomer-setting")
                }
                else {
                    if (!selectGuildWelcomer[0].background) {
                        return selectedChannel.send("Please select a background for your welcome message in #welcomer-setting")
                    }  
                    
                }
            break;
        }
        await createcanvas.execute(member,selectGuildWelcomer,selectedChannel,add,lang)
    }
};
