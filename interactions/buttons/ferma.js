const { ComponentType } = require("discord.js");

module.exports = {

    name: 'ferma',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы выполнили 10 действий на ферме. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку ферма.', ephemeral: true});

    }
};