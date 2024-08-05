const { ComponentType } = require("discord.js");

module.exports = {

    name: 'kbshka',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;
        setTimeout(() => {
            user.send('КД на КБшку прошло');
        }, 240000); // 600000 миллисекунд = 10 минут

        await interaction.reply({content: 'Вы нажали на кнопку КБ, вам придет сообщение через 4 минуты.', ephemeral: true});

    }

};