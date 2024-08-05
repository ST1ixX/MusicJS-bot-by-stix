const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jump')
        .setDescription("Включить определенный трек из очереди")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addIntegerOption(opt => opt.setName("track_in_queue").setDescription("Номер трека в очереди, который нужно включить").setRequired(true)),

    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        const trackNumber = interaction.options.getInteger("track_in_queue");

        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        if(trackNumber >= queue.tracks.length) return await interaction.reply("Трека с таким номером в очереди нет.");

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");

        const success = await queue.node.jump(trackNumber - 1);
        const currentTrack = queue.currentTrack;
        if(success) {
            await interaction.reply(`Успешно прыгнули на новый трек.`);
        } else {
            await interaction.reply(`Не удалось перейти к треку.`);
        }
    }
};
