
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const Discord = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

class slashCommandFactory {

    constructor(client, guildId = false) {
        this.client = client;
        this.guildId = guildId;
        this.commands = JSON.parse(fs.readFileSync("./commands.json"));
        this.refreshCommands();
    }

    async refreshCommands() {
        const rest = new REST({ version: '9' }).setToken(token);


        if (this.guildId) {
            await rest.put(
                Routes.applicationCommands(this.client.user.id, this.guildId),
                { body: this.commands }
            );
        }
        else {
            await rest.put(
                Routes.applicationCommands(this.client.user.id),
                { body: this.commands }
            );
        }
    }

}

module.exports = slashCommandFactory;