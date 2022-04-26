const dbconnect = require("../../db/dbconnect")
const dbdisconnect = require("../../db/dbdisconnect")
const guildSchema = require("../../schemas/guild-schema")
const adminzone = require("./create/adminzone")
const ticketzone = require("./create/ticketzone")
const autoroleplugin = require("./create/autoroleplugin")
const twitchplugin = require("./create/twitchplugin")
const welcomerplugin = require("./create/welcomerplugin")
const leaverplugin = require("./create/leaverplugin")
const playerembed = require("./create/embeds/playerembed")
module.exports = {
    async execute(interaction,customId,lang,plugins) {
        if (customId.includes("Plugin")) {
            var rows = interaction.message.components
            rows.forEach(row => {
                var found = row.components.find(button=> button.customId == interaction.customId) 
                if (found) {
                    found.disabled = true
                    switch (true) {
                        case interaction.customId.includes("Enable"):
                            row.components.find(button=> {
                                if (button.customId.includes("Disable")) button.disabled = false
                            })
                        break;
                        case interaction.customId.includes("Disable"):
                            row.components.find(button=> {
                                if (button.customId.includes("Enable")) button.disabled = false
                            })
                        break;
                    }
                    
                    
                }
            });
            interaction.message.edit({components:rows})
        }
        
        await dbconnect()
        switch (customId) {
            case "adminZoneEnable":
                await adminzone.execute(interaction,lang)
            break;
            case "ticketZoneEnable":
                await ticketzone.execute(interaction,lang)
            break;
            case "autorolePluginEnable":
                plugins.autorolePlugin = {
                    active:true
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.autorolePlugin.active": true,
                    }
                },
                {
                    upsert:true,
                })
                await autoroleplugin.execute(interaction,lang)
            break;
            case "autorolePluginDisable":
                plugins.autorolePlugin = {
                    active:false
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.autorolePlugin": {active:false},
                    }
                },
                {
                    upsert:true,
                })
                interaction.guild.channels.cache.find(channel => {
                    if (channel.name == "autorole-plugin") channel.delete()
                })
            break;
            case "twitchPluginEnable":
                plugins.twitchPlugin = {
                    active:true
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.twitchPlugin.active": true,
                    }
                },
                {
                    upsert:true,
                })
                await twitchplugin.execute(interaction,lang)
            break;
            case "twitchPluginDisable":
                plugins.twitchPlugin = {
                    active:false
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.twitchPlugin": {active:false},
                    }
                },
                {
                    upsert:true,
                })
                interaction.guild.channels.cache.find(channel => {
                    if (channel.name == "twitch-plugin") channel.delete()
                })
            break;
            case "welcomerPluginEnable":
                plugins.welcomerPlugin = {
                    active:true
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.welcomerPlugin.active": true,
                    }
                },
                {
                    upsert:true,
                })
                await welcomerplugin.execute(interaction,lang,plugins)
            break;
            case "welcomerPluginDisable":
                plugins.welcomerPlugin = {
                    active:false
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.welcomerPlugin": {active:false},
                    }
                },
                {
                    upsert:true,
                })
                interaction.guild.channels.cache.find(channel => {
                    if (channel.name == "welcomer-plugin") channel.delete()
                })
            break;
            case "leaverPluginEnable":
                plugins.welcomerPlugin = {
                    active:true
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.leaverPlugin.active": true,
                    }
                },
                {
                    upsert:true,
                })
                await leaverplugin.execute(interaction,lang,plugins)
            break;
            case "leaverPluginDisable":
                plugins.leaverPlugin = {
                    active:false
                }
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.leaverPlugin":  {activeLeaver:false},
                    }
                },
                {
                    upsert:true,
                })
                interaction.guild.channels.cache.find(channel => {
                    if (channel.name == "leaver-plugin") channel.delete()
                })
            break;
            case "SelectPlayerChannel":
                plugins.playerPlugin = {
                    channelId:interaction.values[0]
                }
                await guildSchema.findOneAndUpdate({
                _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.playerPlugin.channelId": interaction.values[0],
                    }
                },
                {
                    upsert:true,
                })
                await playerembed.execute(interaction,lang,plugins.playerPlugin.channelId)
            break;
            default:
                plugins.lang = customId
                await guildSchema.findOneAndUpdate({
                    _id: interaction.guild.id,
                }, {
                    guildLang: customId
                },
                {
                    upsert:true,
                })
                var lang = interaction.message.components[0].components.find(button=> button.customId == interaction.customId).label
                interaction.followUp({
                    content: "Language has been set to" + ` \`${lang}\``,
                    ephemeral: true
                })
            break;
        }
        await dbdisconnect()
    }
}