const { useQueue, QueueRepeatMode } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
    
module.exports = {

    data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription("Повтор трека или очереди в очереди")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addStringOption(opt => opt.setName("option").setDescription("Выбор типа повтора").setRequired(true).addChoices({name : "track", value: "track"}, {name: "queue", value: "queue"})),
    
    async run(interaction) {

        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) return await interaction.reply("В данный момент музыка не воспроизводится.");
        if(!queue.history.nextTrack) return await interaction.reply("Нет треков в очереди.");

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале.");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Бот в другом голосовом канале");
        

        const option = interaction.options.getString("option");
        if(option !== "track" && option !== "queue") return interaction.reply("Вы \`queue\` or \`track\`.");
        
        switch(option) {
            case "track":
                if(queue.repeatMode === 0) {
                    queue.setRepeatMode(QueueRepeatMode.TRACK);
                    await interaction.reply("Повтор одного трека включен");
                } else{
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    await interaction.reply("Повтор одного трека выключен");
                }
            break;

            case "queue":
                if(queue.repeatMode === 0) {
                    queue.setRepeatMode(QueueRepeatMode.QUEUE);
                    await interaction.reply("Повтор очереди включен");
                } else{
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    await interaction.reply("Повтор очереди трека выключен");
                }
            break;
        }
        
    }
};