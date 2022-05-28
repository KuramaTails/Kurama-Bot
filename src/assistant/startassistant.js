module.exports = {
	async execute(gAssistant) {
        gAssistant
        .on('ready', () => console.log('Assistant ready'))
        .on('error', (error) => {
            console.log('Assistant Error:', error);
        });
    }
}