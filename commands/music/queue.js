const { useQueue } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

const PAGE_SIZE = 10;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription("Просмотреть текущую очередь")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  async run(interaction) {
    const queue = useQueue(interaction.guild.id);
    const tracks = queue.tracks.toArray();
    const currentTrack = queue.history.currentTrack;

    // Разделить очередь на страницы
    const pages = [];
    for (let i = 0; i < tracks.length; i += PAGE_SIZE) {
      pages.push(tracks.slice(i, i + PAGE_SIZE));
    }

    // Создать Embed для первой страницы
    let currentPage = 0;
    const embed = createEmbed(pages[currentPage], currentTrack, currentPage, pages.length, interaction);

    // Создать кнопки для переключения страниц
    const row = new ActionRowBuilder()
      .addComponents([
        new ButtonBuilder()
          .setCustomId('prev_page')
          .setStyle('Primary')
          .setEmoji('⬅️')
          .setDisabled(currentPage === 0),
        new ButtonBuilder()
          .setCustomId('next_page')
          .setStyle('Primary')
          .setEmoji('➡️')
          .setDisabled(currentPage === pages.length - 1),
      ]);

    // Отправить Embed с кнопками
    await interaction.reply({ embeds: [embed], components: [row] });

    // Обрабатывать нажатия кнопок
    const filter = (button) => button.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (button) => {
      button.deferUpdate();

      if (button.customId === 'prev_page') {
        currentPage--;
      } else if (button.customId === 'next_page') {
        currentPage++;
      }

      // Обновить Embed и кнопки
      const updatedEmbed = createEmbed(pages[currentPage], currentTrack, currentPage, pages.length, interaction);
      const updatedRow = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder()
            .setCustomId('prev_page')
            .setStyle('Primary')
            .setEmoji('⬅️')
            .setDisabled(currentPage === 0),
          new ButtonBuilder()
            .setCustomId('next_page')
            .setStyle('Primary')
            .setEmoji('➡️')
            .setDisabled(currentPage === pages.length - 1),
        ]);

      await interaction.editReply({ embeds: [updatedEmbed], components: [updatedRow] });
    });

    collector.on('end', () => {
      // Очистить кнопки
      interaction.editReply({ components: [] });
    });
  }
};

function createEmbed(tracks, currentTrack, currentPage, totalPages, interaction) {
  const embed = new EmbedBuilder()
    .setColor('#2b2d31')
    .setTitle('Текущая очередь')
    .setTimestamp()
    .setThumbnail(`${currentTrack.thumbnail}`)
    .setFooter({ text: `${interaction.user.username}` });

  const fields = [];
  for (let i = 0; i < tracks.length; i++) {
    fields.push({ name: `#${(currentPage * PAGE_SIZE) + i + 1}:`, value: tracks[i].title + " by " + tracks[i].author, inline: false });
  }
  embed.addFields(fields);

  return embed;
}
