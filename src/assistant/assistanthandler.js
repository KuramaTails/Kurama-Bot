const { gAssistant } = require("../../bot");
const { config } = require("./config");
const startconversation = require("./startconversation");

module.exports = {
	async execute(interaction,lang,customId) {
        switch (customId) {
            case "y":
                var textQuery = 'si'
                startconversation.execute(gAssistant,interaction,textQuery)
            break;
        }
    }
}