const fs = require('fs');
const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");
//const googleTTS = require('google-tts-api');
const asda = require('./asda');

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            await spamcheck.execute(message,bot.spamList,bot.lang)
            if(message.content.startsWith(bot.prefix)){
                await asda.execute(message)
                /*await googleTTS.getAudioBase64(message.content, { lang: message.guild.settings.lang, slow: false })
                .then((base64) => {
                    const buffer = Buffer.from(base64, 'base64');
                    fs.writeFileSync('./src/sounds/tts.mp3', buffer, { encoding: 'base64' });
                })
                .catch(console.error);*/
            }
        }
	}
};
