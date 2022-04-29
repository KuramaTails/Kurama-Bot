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
                if (!leaverPlugin.textLeave) {
                    return selectedChannel.send(lang.get(interaction.guild.lang).welcomer.errors['noText'])
                }
                else {
                    if (!member.guild.settings.welcomerPlugin.background) {
                        return selectedChannel.send(lang.get(interaction.guild.lang).welcomer.errors['noBackground'])
                    }        
                }
            break;
            case true:
                if (!welcomerPlugin.textWelcome) {
                    return selectedChannel.send(lang.get(interaction.guild.lang).welcomer.errors['noText'])
                }
                else {
                    if (!welcomerPlugin.background) {
                        return selectedChannel.send(lang.get(interaction.guild.lang).welcomer.errors['noBackground'])
                    }  
                    
                }
            break;
        }
        await createcanvas.execute(member,selectGuildWelcomer,selectedChannel,add,lang)
    }
};
