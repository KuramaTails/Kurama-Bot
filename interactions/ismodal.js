const deletecooldown = require("../buttons/deletecooldown");
const search = require("../player/search");
const updateleaver = require("../update/updateleaver");
const updatewelcomer = require("../update/updatewelcomer");

module.exports = {
	async execute(modal,player,lang,cooldownUser) {
        try {
            if (cooldownUser.has(modal.user.id)) {
                return
            } else {
                cooldownUser.set(modal.user.id, true);
                await modal.deferReply({ ephemeral: true });
                try {
                    switch (modal.customId) {
                        case 'modal-search':
                            await search.execute(modal,player,lang)
                        break;
                        case 'modal-welcomer':
                            await updatewelcomer.execute(modal,lang)
                        break;
                        case 'modal-leaver':
                            await updateleaver.execute(modal,lang)
                        break;
                    }
                } finally {
                    await deletecooldown.execute(modal,cooldownUser)
                }
            }
        } catch (error) {
            console.log(error)
        }
	}
};
