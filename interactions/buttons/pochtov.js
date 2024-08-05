const { ComponentType } = require("discord.js");

module.exports = {

    name: 'pochtov',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы доставили почту. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку почта.', ephemeral: true});

    }
};