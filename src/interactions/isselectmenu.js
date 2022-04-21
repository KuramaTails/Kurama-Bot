const dbconnect = require('../misc/db/dbconnect');
const dbdisconnnect = require('../misc/db/dbdisconnect');
const tutorial = require('../tutorial/tutorial');
const playerhandler = require('../player/settings/playerhandler');
const reporthandler = require('../reports/reporthandler');
const bothandler = require('../settings/bothandler');
const welcomerhandler = require('../welcomer/settings/welcomerhandler');

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
        }
        await dbdisconnnect() 
	}
};