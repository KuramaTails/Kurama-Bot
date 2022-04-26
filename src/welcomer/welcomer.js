const createcanvas = require('./createcanvas');
module.exports = {
    async execute(member,add,selectGuildWelcomer,lang) {
        var welcomerPlugin = member.guild.settings.welcomerPlugin
        if (!welcomerPlugin.channelId) {
            return
        }
        var selectedChannel = await member.guild.channels.resolve(selectGuildWelcomer[0].channelId)
        switch (add) {
            case false:
                if (!welcomerPlugin.textLeave) {
                    return selectedChannel.send("Please select a text to have inside your leave message in #welcomer-setting")
                }
                else {
                    if (!member.guild.settings.welcomerPlugin.background) {
                        return selectedChannel.send("Please select a background for your leave message in #welcomer-setting")
                    }        
                }
            break;
            case true:
                if (!welcomerPlugin.textWelcome) {
                    return selectedChannel.send("Please select a text to have inside your welcome message in #welcomer-setting")
                }
                else {
                    if (!welcomerPlugin.background) {
                        return selectedChannel.send("Please select a background for your welcome message in #welcomer-setting")
                    }  
                    
                }
            break;
        }
        await createcanvas.execute(member,selectGuildWelcomer,selectedChannel,add,lang)
    }
};
