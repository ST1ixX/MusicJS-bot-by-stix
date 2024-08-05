const { ComponentType } = require("discord.js");
const { useQueue } = require("discord-player");


module.exports = {

    name: 'skip',
    type: ComponentType.Button,

    async run(interaction) {

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        if(!queue.history.nextTrack) return await interaction.reply("Треков больше нет.");
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
    
        queue.node.skip();
        await interaction.reply(`Трек \`${queue.history.currentTrack.title}\` был пропущен.`);

    }



};