const { SlashCommandBuilder, PermissionFlagsBits  } = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, createComponentBuilder  } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('farm')
    .setDescription("Отображение способов фарма на GTA 5 RP для отслеживания КД ")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
    async run(interaction) {

        const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`Фарм`)
        .setDescription(`Команда бота, которая позволяет отслеживать КД на различные способы фарма проекта GTA 5 RP. Нажмите на кнопку, КД которой вы хотите запустить. Разработано ds: st1ix `)
        .setThumbnail(`https://i.ytimg.com/vi/pMf0Jo7oQ1w/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gXSgTMA8=&rs=AOn4CLBt_clhVE_gdDh0vQDt3SLkMVakdA`)
        .setTimestamp()

        const row = new ActionRowBuilder();
        const rows = new ActionRowBuilder();

        let buttons = [
            new ButtonBuilder()
            .setLabel("Угонка")
            .setCustomId('car')
            .setEmoji('🚗')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Сутенерка")
            .setCustomId('shluha')
            .setEmoji('👧')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Схемы")
            .setCustomId('shemi')
            .setEmoji('⚙️')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Швейка")
            .setCustomId('shveika')
            .setEmoji('👕')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Орга")
            .setCustomId('orga')
            .setEmoji('🏢')
            .setStyle((ButtonStyle.Secondary))
        ];

        let buttoni = [
            new ButtonBuilder()
            .setLabel("Почта")
            .setCustomId('pochta')
            .setEmoji('📧')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("КБ")
            .setCustomId('kbshka')
            .setEmoji('💼')
            .setStyle((ButtonStyle.Secondary)),
            
            new ButtonBuilder()
            .setLabel("Скользская")
            .setCustomId('skolzkaya')
            .setEmoji('💼')
            .setStyle((ButtonStyle.Secondary))
        ];

        rows.addComponents(buttons);
        row.addComponents(buttoni);

        await interaction.reply({content: 'Спрячь меня.', ephemeral: true});
        await interaction.channel.send({ embeds: [embed], components: [row, rows] });
    }
};