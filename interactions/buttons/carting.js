const { ComponentType } = require("discord.js");

module.exports = {

    name: 'carting',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы победили в картинге. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку картинг.', ephemeral: true});

    }
};