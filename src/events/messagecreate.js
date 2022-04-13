const bot = require("../../bot");
const fetchmembers = require("../fetch/fetchmembers");
const dbconnect = require("../misc/db/dbconnect");
const dbdisconnect = require("../misc/db/dbdisconnect");

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            if(message.content.startsWith(bot.prefix)){
            }
        }
	}
};
