const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {

    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Воспроизведение музыки")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addStringOption(opt => opt.setName("song").setDescription("Название песни и автор, ссылка с YouTube").setRequired(true)),

    async run(interaction) {

        await interaction.deferReply();
        const song = interaction.options.getString("song");
        const queue = useQueue(interaction.guild.id);
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) return await interaction.followUp("Вы не в голосовом канале");
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("Вы находитесь в другом голосовом канале");
        // if(queue && (queue.currentTrack in queue.history.tracks)) return await interaction.followUp("Трек уже в очереди");
        
        try {
            const { track } = await interaction.client.player.play(voiceChannelMember, song, {
                requestedBy: interaction.user,
                nodeOptions: {
                    metadata: interaction,
                    volume: 100,
                    leaveOnStop: true,
                    leaveOnEmpty: true,
                    leaveOnEnd: false,
                    selfDeaf: true
                }
            });

            await interaction.followUp(`\`${track}\` длительностью \`${track.duration}\` добавлена в очередь`);
        } catch (err){
            return await interaction.followUp(`Трек ${song} не найден`)
        }
    }
};