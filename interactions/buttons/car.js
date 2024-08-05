const { ComponentType } = require("discord.js");

module.exports = {

    name: 'car',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;
        setTimeout(() => {
            user.send('КД на угонку прошло');
        }, 5400000); // 600000 миллисекунд = 10 минут

        await interaction.reply({content: 'Вы нажали на кнопку угонка, вам придет сообщение через 1.5 часа.', ephemeral: true});

    }



};