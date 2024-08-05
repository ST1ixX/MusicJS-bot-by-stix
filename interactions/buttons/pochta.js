const { ComponentType } = require("discord.js");

module.exports = {

    name: 'pochta',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;
        setTimeout(() => {
            user.send('КД на почту прошло');
        }, 600000); // 600000 миллисекунд = 10 минут

        await interaction.reply({content: 'Вы нажали на кнопку почта, вам придет сообщение через 10 минут.', ephemeral: true});

    }

};