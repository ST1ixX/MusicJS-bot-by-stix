const { ComponentType } = require("discord.js");

module.exports = {

    name: 'dance',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;

        user.send('Вы посетили клуб и победили 3 раза в батле. BP получены.');
        
        await interaction.reply({content: 'Вы нажали на кнопку Dance-Battle.', ephemeral: true});

    }
};