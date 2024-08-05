const { ComponentType } = require("discord.js");

module.exports = {

    name: 'skolzkaya',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;
        setTimeout(() => {
            user.send('КД на скользкую прошло');
        }, 10800000); // 600000 миллисекунд = 10 минут

        await interaction.reply({content: 'Вы нажали на кнопку скользкая, вам придет сообщение через 3 часа.', ephemeral: true});

    }

};