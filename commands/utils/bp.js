const { SlashCommandBuilder, PermissionFlagsBits  } = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, createComponentBuilder  } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('bp')
    .setDescription("Отслеживание легких способов фарма BP проекта GTA 5 RP")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
    async run(interaction) {

        const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`Фарм`)
        .setDescription(`Команда бота, которая позволяет отслеживать ежедневное выполнение различных способов фарма BP проекта GTA 5 RP.`)
        .setThumbnail(`https://i.ytimg.com/vi/pMf0Jo7oQ1w/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gXSgTMA8=&rs=AOn4CLBt_clhVE_gdDh0vQDt3SLkMVakdA`)
        .setTimestamp()

        const row = new ActionRowBuilder();
        const rows = new ActionRowBuilder();
        const rovs = new ActionRowBuilder();

        let buttons = [
            new ButtonBuilder()
            .setLabel("Киностудия")
            .setCustomId('movie')
            .setEmoji('🎬')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Арена")
            .setCustomId('arena')
            .setEmoji('⚔️')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Ферма")
            .setCustomId('ferma')
            .setEmoji('🐮')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Отвезти почту")
            .setCustomId('pochtov')
            .setEmoji('✉️')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Dance-Battle")
            .setCustomId('dance')
            .setEmoji('💃')
            .setStyle((ButtonStyle.Secondary))
        ];

        let buttoni = [
            new ButtonBuilder()
            .setLabel("Поставить видео")
            .setCustomId('video')
            .setEmoji('🎦')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("КБ")
            .setCustomId('kbsh')
            .setEmoji('💼')
            .setStyle((ButtonStyle.Secondary)),
            
            new ButtonBuilder()
            .setLabel("Картинг")
            .setCustomId('carting')
            .setEmoji('🏎️')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Гонка")
            .setCustomId('racing')
            .setEmoji('♿')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setLabel("Нули")
            .setCustomId('zeros')
            .setEmoji('🎰')
            .setStyle((ButtonStyle.Secondary))
        ];

        let btn = [

            new ButtonBuilder()
            .setLabel("ТК")
            .setCustomId('tk')
            .setEmoji('🔫')
            .setStyle((ButtonStyle.Secondary))

        ];

        rows.addComponents(buttons);
        row.addComponents(buttoni);
        rovs.addComponents(btn);

        await interaction.reply({content: 'Спрячь меня.', ephemeral: true});
        await interaction.channel.send({ embeds: [embed], components: [row, rows, rovs] });
    }
};