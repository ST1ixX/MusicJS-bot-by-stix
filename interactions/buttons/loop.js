const { ComponentType } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");

module.exports = {

 name: 'loop',
 type: ComponentType.Button,

 async run(interaction) {

 const queue = useQueue(interaction.guild.id);
 if (!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
 const voiceChannelMember = interaction.member.voice.channel;
 const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
 if (!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
 if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");

 // Обновляем состояние повтора
 const newRepeatMode = (queue.repeatMode + 1) % 3;

 // Устанавливаем состояние повтора для очереди
 queue.setRepeatMode(newRepeatMode);

 // Отправляем сообщение о новом состоянии повтора
 const repeatModeText = {
  0: "Повтор выключен",
  1: "Повтор одного трека включен",
  2: "Повтор очереди включен",
 }[newRepeatMode];
 await interaction.reply(repeatModeText);

 // Обновляем режим повтора, если добавлен новый трек
 if (queue.tracks.length > 1) {
  queue.setRepeatMode(newRepeatMode);
}

 console.log(queue.repeatMode);
 }
};
