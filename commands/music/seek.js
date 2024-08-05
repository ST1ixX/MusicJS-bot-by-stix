const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
    
module.exports = {

    data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription("Перемотать текущий трек на определенную временную метку")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addIntegerOption(opt => opt.setName("duration").setDescription("Время до которого необходимо переместиться в секундах").setRequired(true)),
    
    async run(interaction) {

        const duration = interaction.options.getInteger("duration");
        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
    
        queue.node.seek(duration * 1000);
        await interaction.reply(`Трек \`${queue.history.currentTrack.title}\` перемотан.`);
    }
};