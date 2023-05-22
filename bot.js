const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    intents: new Discord.Intents(46603)
});

client.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        message.reply("Pong!");
    }
});

client.login();