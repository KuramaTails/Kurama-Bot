const guildSchema = require('../schemas/guild-schema');
const bot = require("../../bot");
const dbconnect = require('../db/dbconnect');
const dbdisconnect = require('../db/dbdisconnect');
const registerpermissions = require('./guild/registerpermissions');

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
        if (!process.env.DATABASE_TOKEN) {return console.log("Error,no db found")}
        if (!bot.client.application?.owner) await bot.client.application?.fetch();
        var guilds= await bot.client.guilds.cache
        await dbconnect()
        var guildSettings = await guildSchema.find()
        await dbdisconnect()
        await guilds.forEach(async guild=> {
            var selectedGuild = await guildSettings.find(setting => setting.id == guild.id)
            if (!selectedGuild) return
            guild.settings = {
                lang: selectedGuild.guildLang,
                twitchPlugin : {
                    active:selectedGuild.plugins.twitchPlugin.active,
                    channelId:selectedGuild.plugins.twitchPlugin.channelId,
                    streamerList:selectedGuild.plugins.twitchPlugin.streamerList
                },
                autorolePlugin : {
                    active:selectedGuild.guildAutorolePluginActive,
                    role:selectedGuild.guildAutorolePluginRole
                },
                welcomerPlugin : {
                    active:selectedGuild.guildWelcomerPluginActive,
                    channelId:selectedGuild.guildWelcomerPluginChannelId,
                    textWelcomer: selectedGuild.guildWelcomerPluginTextWelcomer,
                    activeLeaver: selectedGuild.guildWelcomerPluginActiveLeaver,
                    textLeave: selectedGuild.guildWelcomerPluginTextLeaver,
                    background:selectedGuild.guildWelcomerPluginBackground,
                }
            }
            await registerpermissions.execute(guild,bot.client.user.id,bot.commands)
            console.log(`Bot initializated in ${guild.name}`)
            })
        console.log(`Bot ready`)
        
    }
};