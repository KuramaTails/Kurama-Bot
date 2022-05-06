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
const changelang = require("./changelang")
const chooserolesembed = require("../../tutorial/create/zone/embeds/chooserolesembed")
module.exports = {
    async execute(interaction,customId,lang,plugins) {
        var found
        var disabled
        var components = interaction.message.components
        if (!interaction.customId.includes("select")) {
            for (const component of components) {
                found = component.components.find(button=> button.customId == interaction.customId)
                if (found) {
                    disabled = component.components.find(button=> !button.customId.includes("tag") && button.disabled == true)
                    break
                }
            }
            found.disabled = true
            if (disabled) disabled.disabled = false
            interaction.message.edit({components:components})
        }
        switch (customId) {
            case "adminZoneEnable":
                await adminzone.execute(interaction,lang)
            break;
            case "adminZoneDisable":
                var par = interaction.guild.channels.cache.find(channel =>channel.name == "Admin Zone")
                if (par) par.children.forEach(channel => channel.delete()),par.delete()
            break;
            case "ticketZoneEnable":
                await ticketzone.execute(interaction,lang)
            break;
            case "ticketZoneDisable":
                var par = interaction.guild.channels.cache.find(channel =>channel.name == "Ticket Zone")
                if (par) par.children.forEach(channel => channel.delete()),par.delete()
            break;
            case "selectPlayerChannel":
                var selectedChannel = interaction.guild.channels.cache.find(channel => channel.id == interaction.values[0])
                if (!selectedChannel) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= selectedChannel.name
                await interaction.message.edit({components:[updatePlaceholder]})
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
            case "selectChooseRoleChannel":
                var selectedChannel = interaction.guild.channels.cache.find(channel => channel.id == interaction.values[0])
                if (!selectedChannel) return
                var updatePlaceholder = interaction.message.components[0]
                updatePlaceholder.components[0].placeholder= selectedChannel.name
                await interaction.message.edit({components:[updatePlaceholder]})
                plugins.chooseRolePlugin = {
                    channelId:interaction.values[0]
                }
                await guildSchema.findOneAndUpdate({
                _id: interaction.guild.id,
                }, {
                    $set: {
                        "plugins.chooseRolePlugin": {channelId:interaction.values[0]},
                    }
                },
                {
                    upsert:true,
                })
                var channel = interaction.guild.channels.cache.find(channel=> channel.id == interaction.values[0])
                await chooserolesembed.execute(channel,lang)
            break;
            default:
                await dbconnect()
                switch (customId) {
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
                        plugins.leaverPlugin = {
                            active:true
                        }
                        await guildSchema.findOneAndUpdate({
                            _id: interaction.guild.id,
                        }, {
                            $set: {
                                "plugins.leaverPlugin": {active:true},
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
                    default:
                        await changelang.execute(interaction,customId,lang,plugins)
                    break;
                }
                await dbdisconnect()
            break;
        }
        
    }
}