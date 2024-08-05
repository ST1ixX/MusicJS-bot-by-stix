const { ComponentType } = require("discord.js");

module.exports = {

    name: 'racing',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы учавствовали в гонке. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку гонка.', ephemeral: true});

    }
};