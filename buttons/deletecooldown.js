module.exports = {
    async execute(interaction,cooldownUser,duration) {
        if (!duration) {
            duration=3
        }
        setTimeout(() => {
            cooldownUser.delete(interaction.user.id);
        }, duration*1000);
    }
};
    