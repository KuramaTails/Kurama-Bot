module.exports = {
	name: 'interactionCreate',
	execute(interactioncreate) {
		console.log(`${interactioncreate.user.tag} in #${interactioncreate.channel.name} triggered an interaction.`);

	},

};