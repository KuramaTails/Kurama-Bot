const playerSchema = require('../../schemas/player-schema');
const dbconnect = require('../../misc/db/dbconnect');
const dbdisconnect = require("../../misc/db/dbdisconnect");
module.exports = {
	async execute(modal,player,lang) {
        await dbconnect()
        var selectGuild = await playerSchema.find({ "_id" : modal.guildId})
        await dbdisconnect()
        if (!selectGuild) {return}
        else {
            var link = modal.getTextInputValue('textinput-customid')
            var voicechannel = modal.member.voice.channel
            if (!voicechannel) {
                await modal.editReply({ content: lang.get(modal.guild.lang).commands.player.commands.errors["memberJoin"], ephemeral: true })
                return
            }
            await player.play(voicechannel, link)
            var queue = await player.queues.get(voicechannel)
            let addedsong = queue.songs[queue.songs.length-1]
            var string = lang.get(modal.guild.lang).commands.player.commands["play"]
            let result = string.replace("${addedsong.name} - ${addedsong.formattedDuration}",`${addedsong.name} - ${addedsong.formattedDuration}`);
            await modal.editReply({ content: result, ephemeral: true })
        }
    }
};