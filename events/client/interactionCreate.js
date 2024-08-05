const { Events, InteractionType, PermissionsBitField } = require("discord.js");


module.exports = {
    
    name: Events.InteractionCreate,
    async run(client, interaction) {

        switch(interaction.type){

            case InteractionType.ApplicationCommand:
                const command = client.commands.get(interaction.commandName);
                await command.run(interaction);
            break;

            default:
                const name = interaction.customId.split("_")[0];
                const args = interaction.customId.split("_").slice(1);
                const file = client.interactions.find(i => i.name === name && i.type === interaction.componentType);
                if(!file) return;

                if(file.permission && !interaction.member.permissions.has(new PermissionsBitField(file.permission))) return await interaction.reply("Недостаточно прав")
                await file.run(interaction, ...args);
            
            break;
        };
        
    }
}; 