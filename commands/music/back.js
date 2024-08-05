const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
    
module.exports = {

    data: new SlashCommandBuilder()
    .setName('back')
    .setDescription("Включить предыдущий трек")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),
    
    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        if(!queue.history.previousTrack) return await interaction.reply("Треков в очереди нет.");
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
    
    
        await queue.history.back();
        await interaction.reply(`Трек \`${queue.history.currentTrack.title}\` вернулся.`);
    
    
    
    }
};