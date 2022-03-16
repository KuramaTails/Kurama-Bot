module.exports = {
    async execute(interaction,cooldownUser) {
        setTimeout(() => {
            cooldownUser.delete(interaction.user.id);
        }, 3*1000);
    }
};
    