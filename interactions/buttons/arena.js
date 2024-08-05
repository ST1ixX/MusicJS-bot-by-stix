const { ComponentType } = require("discord.js");

module.exports = {

    name: 'arena',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы победили 3 раза на арене. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку арена.', ephemeral: true});

    }
};