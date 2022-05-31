const bot = require("../../bot");
const search = require("../player/events/search");
const updatewelcomer = require("../settings/welcomer/updatewelcomer");
const addstreamer = require("../settings/twitch/addstreamer");
const updateleaver = require("../settings/leaver/updateleaver");
const deletestreamer = require("../settings/twitch/deletestreamer");
const urlbackground = require("../settings/welcomer/urlbackground");
const assistant = require("../assistant/assistant");

module.exports = {
	async execute(interaction,lang) {
        interaction.customId=='assistant'? await interaction.deferUpdate() : await interaction.deferReply()
        switch (interaction.customId) {
            case 'search':
                await search.execute(interaction,bot.player,lang)
            break;
            case 'textWelcomer':
                await updatewelcomer.execute(interaction,lang)
            break;
            case 'textLeaver':
                await updateleaver.execute(interaction,lang)
            break;
            case 'urlBackground':
                await urlbackground.execute(interaction,lang)
            break;
            case 'addStreamer':
                await addstreamer.execute(interaction,lang,bot.twitch)
            break;
            case 'deleteStreamer':
                await deletestreamer.execute(interaction,lang,bot.twitch)
            break;
            case 'assistant':
                var textQuery = interaction.fields.getTextInputValue('textInput')
                assistant.execute(interaction,textQuery)
            break;
        }
	}
};
