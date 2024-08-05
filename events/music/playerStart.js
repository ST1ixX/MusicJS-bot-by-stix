const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, createComponentBuilder  } = require('discord.js');
const fs = require('fs');

let lastMessages = new Map(); // Создаем Map для хранения последних сообщений

module.exports = {

    name: "playerStart",
    async run(client, queue, track, interaction) {

        // Выводим информацию о треке
        const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`${track.author}`)
        .setDescription(`**${track.description}** ${track.duration}`)
        .setThumbnail(`${track.thumbnail}`)
        .setTimestamp()
        .setFooter({text: `${track.requestedBy.username}`})
        .setAuthor({ name: `${track.author}`, url: `${track.url}`})

        const row = new ActionRowBuilder();
        const rows = new ActionRowBuilder();
        const rovs = new ActionRowBuilder();

        let buttons = [
            new ButtonBuilder()
            .setCustomId('loop')
            .setEmoji('🔁')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setCustomId('back')
            .setEmoji('⏮️')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setCustomId('skip')
            .setEmoji('⏭️')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setCustomId('stop')
            .setEmoji('⏹️')
            .setStyle((ButtonStyle.Secondary))
        ];

        let resumeButton = new ButtonBuilder()
        .setCustomId('resume')
        .setEmoji('⏯️')
        .setStyle((ButtonStyle.Success));

        buttons.splice(2, 0, resumeButton);

        let buttonsCopy = [...buttons];

        let pauseButton = new ButtonBuilder()
            .setCustomId('pause')
            .setEmoji('⏸️')
            .setStyle((ButtonStyle.Secondary));

        buttonsCopy[2] = pauseButton;

        let btnseek = [
            new ButtonBuilder()
            .setCustomId('shuffle')
            .setEmoji('🔀')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setCustomId('seekb')
            .setEmoji('⏪')
            .setStyle((ButtonStyle.Secondary)),

            new ButtonBuilder()
            .setCustomId('seek')
            .setEmoji('⏩')
            .setStyle((ButtonStyle.Secondary)),

        ];

        rovs.addComponents(btnseek);
        rows.addComponents(buttons);
        row.addComponents(buttonsCopy);
        
        // Получаем ID сервера
        const guildId = queue.metadata.guild.id;

        // Если есть предыдущее сообщение для этого сервера, обновите его, чтобы удалить кнопки
        if (lastMessages.has(guildId)) {
            const lastMessage = lastMessages.get(guildId);
            await lastMessage.edit({ components: [] });
        }

        // Отправьте новое сообщение с кнопками
        const newMessage = await queue.metadata.channel.send({ embeds: [embed], components: [row, rovs] });
        
        // Сохраняем новое сообщение в Map
        lastMessages.set(guildId, newMessage);

        client.on('interactionCreate', async interaction => {
            
            if (!interaction.isButton()) return;
            if (interaction.customId === 'pause') {
                await interaction.message.edit({  components: [rows, rovs] });            }
            if (interaction.customId === 'resume') {           
                await interaction.message.edit({ components: [row, rovs] });
            }
            if (interaction.customId === 'stop') {           
                await lastMessages.get(guildId).edit({ components: [] });
            }            
        });
        
        
        
    }        
};
