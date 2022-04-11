const bot = require("../../bot");
const deletecooldown = require("../misc/deletecooldown");
const search = require("../player/events/search");
const updateleaver = require("../settings/leaver/updateleaver");
const updatewelcomer = require("../settings/welcomer/updatewelcomer");

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
                        case 'modal-welcomer':
                            await updatewelcomer.execute(modal,bot.lang)
                        break;
                        case 'modal-leaver':
                            await updateleaver.execute(modal,bot.lang)
                        break;
                    }
                } finally {
                    await deletecooldown.execute(modal,bot.cooldownUser)
                }
            }
        } catch (error) {
            console.log(error)
        }
	}
};
