const { ComponentType } = require("discord.js");
const { useQueue } = require("discord-player");


module.exports = {

    name: 'shuffle',
    type: ComponentType.Button,

    async run(interaction) {

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        if(queue.tracks.data.length < 2 ) return await interaction.reply("В очереди должно быть больше 2х треков.");

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
        
        queue.tracks.shuffle();
        await interaction.reply("Очередь была перемешана!")

    }



};