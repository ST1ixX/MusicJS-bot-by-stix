const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
    
module.exports = {

    data: new SlashCommandBuilder()
    .setName("setvolume")
    .setDescription("Установить значение громкости")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addNumberOption(opt => opt.setName("volume").setDescription("Значение громкости").setRequired(true).setMaxValue(200).setMinValue(0)),
    
    async run(interaction) {

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
        
        const volume = interaction.options.getNumber("volume");
        if(queue.node.volume === volume) return await interaction.reply(`Громкость уже установлена на \`${queue.node.volume}%\`.`);
    
        await interaction.reply(`Громкость установлена на \`${queue.node.volume}%\` из \`${volume}%\`.`);
        queue.node.setVolume(volume);
    }
};