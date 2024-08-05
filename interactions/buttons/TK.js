const { ComponentType } = require("discord.js");

module.exports = {

    name: 'tk',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы победили 5 раз на ТК. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку ТК.', ephemeral: true});

    }
};