const { useQueue } = require("discord-player");
const { ComponentType } = require("discord.js");
    
module.exports = {

    name: 'seek',
    type: ComponentType.Button,
    
    async run(interaction) {

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
        
        const currentTrackProgressMS = queue.node.estimatedPlaybackTime; // текущая позиция в треке в миллисекундах

        const newPosition = currentTrackProgressMS + 10 * 1000; // добавляем 10 секунд к текущей позиции
        queue.node.seek(newPosition);

        await interaction.reply(`Трек перемотан на 10 секунд от текущей позиции.`);
    }
};