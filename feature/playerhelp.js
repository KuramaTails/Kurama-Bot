const { Permissions } = require('discord.js');
const permissions = new Permissions([
	Permissions.FLAGS.ADMINISTRATOR,
]);

module.exports = {
	name: "playerhelp",
	ephemeral: "false",
	command:"Playerhelp",
	desc:"Gives you a list of all music player's commands available",
    example:"!playerhelp",
	async execute(messageCreate, args) {
    }
};