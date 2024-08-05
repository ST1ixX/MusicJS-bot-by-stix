const { ComponentType } = require("discord.js");

module.exports = {

    name: 'video',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы поставили 5 роликов в кинотеатре. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку видео.', ephemeral: true});

    }
};