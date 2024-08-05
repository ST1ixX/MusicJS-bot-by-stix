const { ComponentType } = require("discord.js");

module.exports = {

    name: 'shveika',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;
        setTimeout(() => {
            user.send('КД на швейку прошло');
        }, 14400000); // 600000 миллисекунд = 10 минут

        await interaction.reply({content: 'Вы нажали на кнопку швейка, вам придет сообщение через 4 часа.', ephemeral: true});

    }

};