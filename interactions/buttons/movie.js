const { ComponentType } = require("discord.js");

module.exports = {

    name: 'movie',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы посетили киностудию. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку киностудия.', ephemeral: true});

    }
};