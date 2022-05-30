const { config } = require("./config");
const { startConversation, a } = require("./start");

module.exports = {
    async execute(gAssistant,interaction,textQuery) {
        config.conversation.textQuery = textQuery
        await gAssistant.start(config.conversation, conversation => {startConversation(conversation,interaction)})
    },
}