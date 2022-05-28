const { prefix, lang } = require("../../bot");
const bot = require("../../bot");
const spamcheck = require("../spam/spamcheck");
//const googleTTS = require('google-tts-api');

module.exports = {
	name: 'messageCreate',
    async execute(message) {
        if (message.author.username!=bot.client.user.username){
            await spamcheck.execute(message,bot.spamList,lang)
            if(message.content.startsWith(prefix)){
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
