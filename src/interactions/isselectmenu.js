const dbconnect = require('../db/dbconnect');
const dbdisconnnect = require('../db/dbdisconnect');
const tutorial = require('../tutorial/tutorial');
const playerhandler = require('../settings/player/playerhandler');
const reporthandler = require('../reports/reporthandler');
const bothandler = require('../settings/bot/bothandler');
const welcomerhandler = require('../settings/welcomer/welcomerhandler');
const settingshandler = require('../settings/settingshandler');

module.exports = {
	async execute(interaction,lang) {
        var separateCustomId = interaction.customId.split("-")
        await dbconnect()
        switch (separateCustomId[0]) {
            case "tutorial":
                await tutorial.execute(interaction,lang,separateCustomId[1])
            break;
            case "welcomer":
                await welcomerhandler.execute(interaction,0,lang,separateCustomId[1])
            break;
            case "player":
                await playerhandler.execute(interaction,lang)
            break;
            case "bot":
                await bothandler.execute(interaction,lang,separateCustomId[1])
            break;
            case "report":
                await reporthandler.execute(interaction,lang,separateCustomId[1])
            break;
            case "settings":
				await settingshandler.execute(interaction,lang,separateCustomId)
			break;
        }
        await dbdisconnnect() 
	}
};