const { ComponentType } = require("discord.js");

module.exports = {

    name: 'orga',
    type: ComponentType.Button,

    async run(interaction) {

        const user = interaction.user;
        setTimeout(() => {
            user.send('КД на оргу прошло');
        }, 7200000); // 600000 миллисекунд = 10 минут

        await interaction.reply({content: 'Вы нажали на кнопку орга, вам придет сообщение через 2 часа.', ephemeral: true});

    }



};