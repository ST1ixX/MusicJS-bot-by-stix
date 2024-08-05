const {Client, IntentsBitField, Collection } = require("discord.js");
const client = new Client({intents: new IntentsBitField(3276799)});
const { Player } = require("discord-player");
const loadCommands = require("./loader/loadcommands");
const loadEvents = require("./loader/loadEvents");
const loadInteractions = require("./loader/loadInteractions");
require("dotenv").config();

client.commands = new Collection();
client.interactions = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});
// Загрузите встроенные функции извлечения
client.player.extractors.loadDefault();
// Добавьте свою собственную функцию извлечения


(async() => {
    loadCommands(client);
    loadEvents(client);
    loadInteractions(client);
    await client.login(process.env.TOKEN);
})();

