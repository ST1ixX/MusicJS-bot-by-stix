const { Events, ActivityType} = require("discord.js");

module.exports = {

    name: Events.ClientReady,
    async run(client) {
        

        await client.application.commands.set(client.commands.map(command => command.data));
        console.log("[SlashCommands] => загружены");

        client.user.setActivity("жизнь", {type: ActivityType.Streaming});
        
        console.log(`[Bot] =>  ${client.user.username} в сети`);
    }
};