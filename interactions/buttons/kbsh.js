const { ComponentType } = require("discord.js");

module.exports = {

    name: 'kbsh',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы сдали КБшку на нужную сумму. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку КБ.', ephemeral: true});

    }
};