const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Удалить сообщения")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addIntegerOption(
      opt =>
        opt
          .setName("messagedell")
          .setDescription("Количество сообщений, которое надо удалить")
          .setRequired(true)
          .setMinValue(1)  // Set minimum value here
          .setMaxValue(100)
    ),

  async run(interaction) {
    const amount = interaction.options.getInteger("messagedell");

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: "Неверный формат количества сообщений! Выберите число от 1 до 100.",
        ephemeral: true,
      });
    }

    try {
      const messagesToDelete = await interaction.channel.messages.fetch({
        limit: amount,
      });
      await interaction.channel.bulkDelete(messagesToDelete);
      interaction.reply({
        content: `Удалено ${amount} сообщений!`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "Ошибка при удалении сообщений!",
        ephemeral: true,
      });
    }
  },
};