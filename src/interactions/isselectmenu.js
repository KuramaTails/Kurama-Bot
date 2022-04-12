const dbconnect = require('../misc/db/dbconnect');
const dbdisconnnect = require('../misc/db/dbdisconnect');
const welcomerhandler = require('../settings/welcomer/welcomerhandler');
const tutorial = require('../tutorial/tutorial');
const bothandler = require("../settings/bot/bothandler");
const playerhandler = require('../settings/player/playerhandler');

module.exports = {
	async execute(interaction,lang) {
        var separateCustomId = interaction.customId.split("-")
        await dbconnect()
        switch (separateCustomId[0]) {
            case "tutorial":
                tutorial.execute(interaction,lang,separateCustomId[1])
            break;
            case "welcomer":
                welcomerhandler.execute(interaction,0,lang,separateCustomId[1])
            break;
            case "player":
                playerhandler.execute(interaction,lang)
            break;
            case "bot":
                bothandler.execute(interaction,lang,separateCustomId[1])
            break;
        }
        await dbdisconnnect() 
	}
};