const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');

class SlashCommandFactory {

    private client: any;
    private commands: Array<Object>;
    private fs: any;
    private token: string;

    constructor(client: any) {
        this.fs = require('fs');
        this.token = require('./config.json').token;
        this.client = client;
        this.commands = JSON.parse(this.fs.readFileSync("./commands.json"));
        this.refreshCommands();
    }

    async refreshCommands() {
        const rest = new REST({ version: '9' }).setToken(this.token);

            await rest.put(
                Routes.applicationCommands(this.client.user.id, "123455676479"),
                { body: this.commands }
            );
    }

}

module.exports = SlashCommandFactory;