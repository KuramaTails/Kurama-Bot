const bot = require("../../bot");
const search = require("../player/events/search");
const updatewelcomer = require("../settings/welcomer/updatewelcomer");
const addstreamer = require("../settings/twitch/addstreamer");
const updateleaver = require("../settings/leaver/updateleaver");
const deletestreamer = require("../settings/twitch/deletestreamer");

module.exports = {
    name: 'modalSubmit',
	async execute(modal) {
        try {
            if (bot.cooldownUser.has(modal.user.id)) {
                return
            } else {
                bot.cooldownUser.set(modal.user.id, true);
                await modal.deferReply({ ephemeral: true });
                try {
                    switch (modal.customId) {
                        case 'modal-search':
                            await search.execute(modal,bot.player,bot.lang)
                        break;
                        case 'modal-textWelcomer':
                            await updatewelcomer.execute(modal,bot.lang)
                        break;
                        case 'modal-textLeaver':
                            await updateleaver.execute(modal,bot.lang)
                        break;
                        case 'modal-addStreamer':
                            await addstreamer.execute(modal,bot.lang,bot.twitch)
                        break;
                        case 'modal-deleteStreamer':
                            await deletestreamer.execute(modal,bot.lang,bot.twitch)
                        break;
                    }
                } finally {
                    setTimeout(() => {
                        bot.cooldownUser.delete(modal.user.id);
                    }, 3*1000);
                }
            }
        } catch (error) {
            console.log(error)
        }
	}
};
