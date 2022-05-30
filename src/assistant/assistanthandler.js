const { gAssistant } = require("../../bot");
const { config } = require("./config");
const startconversation = require("./startconversation");

module.exports = {
	async execute(interaction,lang,customId) {
        switch (customId) {
            case "y":
                var textQuery = 'imposta voce femminile'
                startconversation.execute(gAssistant,interaction,textQuery)
            break;
        }
    }
}