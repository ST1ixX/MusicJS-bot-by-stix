// pause.js
const { ComponentType } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    name: 'resume',
    type: ComponentType.Button,

    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");        

        if(queue.node.isPaused()){
            queue.node.resume();
            await interaction.deferUpdate();
        } else {
            queue.node.pause();
            await interaction.deferUpdate();
        }
    }
};
