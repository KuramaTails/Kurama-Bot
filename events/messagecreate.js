module.exports = {
	name: 'messagecreate',
	execute(messagecreate) {
        if (!messagecreate.isCommand()) return;
	    if (messagecreate.commandName === 'messagecreate') {
            console.log(`${messagecreate.author } send a message in #${messagecreate.channel} .`);
	    }
    }
};