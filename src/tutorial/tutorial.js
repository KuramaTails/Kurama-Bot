const dbconnect = require("../misc/db/dbconnect");
const dbdisconnect = require("../misc/db/dbdisconnect");
const autoroleSchema = require("../schemas/autorole-schema");
const guildSchema = require("../schemas/guild-schema");
const welcomeSchema = require("../schemas/welcome-schema");
const createplayerzone = require("./create/createplayerzone");
const createserverstats = require("./create/createserverstats");
const createwelcomezone = require("./create/createwelcomezone");
const createbotsettings = require("./create/settings/createbotsettings");
const createwelcomersettings = require("./create/settings/createwelcomersettings");
const part1 = require("./part1");
const part2 = require("./part2");
const part3 = require("./part3");
const part4 = require("./part4");
const part5 = require("./part5");
const endtutorial = require("./endtutorial");
const selectlang = require("./selectlang");
const createplayerembed = require("./create/createplayerembed");
const createplayersettings = require("./create/settings/createplayersettings");
const createplayersettingsembed = require("./create/settings/embeds/createplayersettingsembed");
const part6 = require("./part6");
const playerSchema = require("../schemas/player-schema");
const tutorialparts = [part2,part3,part4,part5,part6,endtutorial]
module.exports = {
    async execute(interaction,lang,customId) {
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(interaction.message.embeds[0].title);
        if (!matches) {
            switch (customId) {
                case "start":
                    await selectlang.execute(interaction,lang)
                break;
                case "end":
                    await interaction.guild.channels.cache.find(c => c.name == "start-with-kurama").delete()
                break;
                default:
                    await dbconnect()
                    await guildSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                    }, {
                        guildLang: customId
                    },
                    {
                        upsert:true,
                    })
                    await dbdisconnect()
                    interaction.guild.lang = customId
                    await part1.execute(interaction,lang)
                    
                break;
            }
        }
        else {
            var splitParts = matches[1].split("/")
            var part = parseInt(splitParts[0])
            try {
                switch (customId) {
                    case "yes":
                        switch (part) {
                            case 1:
                                await createserverstats.execute(interaction,lang)
                            break;
                            case 2:
                                await createwelcomezone.execute(interaction,lang)
                            break;
                            case 3:
                                await createplayerzone.execute(interaction,lang)
                            break;
                            case 4:
                                await dbconnect()
                                await welcomeSchema.findOneAndUpdate({
                                    _id: interaction.guild.id,
                                }, {
                                    activeWelcome:true,
                                    activeLeave:false,
                                },
                                {
                                    upsert:true,
                                })
                                await dbdisconnect()
                                await createwelcomersettings.execute(interaction,lang)
                            break;
                            case 6:
                                await dbconnect()
                                    await autoroleSchema.findOneAndUpdate({
                                        _id: interaction.guild.id,
                                    }, {
                                        active:true,
                                    },
                                    {
                                        upsert:true,
                                    })
                                    await dbdisconnect()
                                await createbotsettings.execute(interaction,lang)
                            break;
                        }
                    break;
                    case "no":
                        switch (part) {
                            case 4:
                                await dbconnect()
                                await welcomeSchema.findOneAndUpdate({
                                    _id: interaction.guild.id,
                                }, {
                                    activeWelcome:false,
                                    activeLeave:false,
                                },
                                {
                                    upsert:true,
                                })
                                await dbdisconnect()
                                await createwelcomersettings.execute(interaction,lang)
                            break;
                            case 6:
                                await dbconnect()
                                await autoroleSchema.findOneAndUpdate({
                                    _id: interaction.guild.id,
                                }, {
                                    active:false,
                                },
                                {
                                    upsert:true,
                                })
                                await dbdisconnect()
                                await createbotsettings.execute(interaction,lang)
                            break;
                        }
                    break;
                    default:
                        var selectedChannelId = interaction.values[0]
                        await playerSchema.findOneAndUpdate({
                        _id: interaction.guild.id,
                        }, {
                            channelId:selectedChannelId
                        },
                        {
                            upsert:true,
                        })
                    
                        await createplayerembed.execute(interaction,selectedChannelId,lang)
                        await createplayersettings.execute(interaction)
                        await createplayersettingsembed.execute(interaction,lang)
                    break;
                }
            } finally {
                if (part<7) {
                    await tutorialparts[part-1].execute(interaction,lang)
                }
            }
        }
    }
}