const createcanvas = require('./createcanvas');
module.exports = {
    async execute(member,add,lang) {
        var welcomerPlugin = member.guild.settings.plugins.welcomerPlugin
        var leaverPlugin = member.guild.settings.plugins.leaverPlugin
        if (!welcomerPlugin.channelId) {
            return
        }
        var selectedChannel = await member.guild.channels.resolve(welcomerPlugin.channelId)
        if (!welcomerPlugin.background) {
            return selectedChannel.send(lang.get(member.guild.settings.lang).welcomer.errors['noBackground'])
        }
        switch (add) {
            case false:
                if (!leaverPlugin.textLeaver) {
                    return selectedChannel.send(lang.get(member.guild.settings.lang).welcomer.errors['noTextLeaver'])
                }
            break;
            case true:
                if (!welcomerPlugin.textWelcomer) {
                    return selectedChannel.send(lang.get(member.guild.settings.lang).welcomer.errors['noTextWelcomer'])
                }
            break;
        }
        await createcanvas.execute(member,selectedChannel,add,lang)
    }
};
