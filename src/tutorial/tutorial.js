const fs= require('fs');
module.exports = {
    async execute(interaction,lang,part) {
        var parts = []
        fs.readdirSync('./src/tutorial/embeds').forEach(element => {
            if (element.endsWith(".js")) {
                var file= require(`./embeds/${element}`)
                parts[file.part]= file
            }
        });
        switch (part) {
            case "start":
                await parts[1].execute(interaction,lang)
            break;
            case "end":
                await interaction.guild.channels.cache.find(c => c.name == "start-with-kurama").delete()
            break;
            case 0:
                await parts[part].execute(interaction,lang,part)
            break;
            case 2:
                await parts[part].execute(interaction,lang,part)
            break;
            case "yes":
            case "no":
            default:
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(interaction.message.embeds[0].title)
                var splitParts = matches? matches[1].split("/") : ""
                var tutorialPart = splitParts? parseInt(splitParts[0]) : 0
                console.log(parts[tutorialPart+2])
                await parts[tutorialPart+2].execute(interaction,lang,part)
            break;
        }
    }
};