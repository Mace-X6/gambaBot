class commandHandler {

    constructor(interaction) {
        this.interaction = interaction;
        this.handleCommand();
    }
    handleCommand() {
        var command = require(`./commands/${this.interaction.commandName}.js`);
        new command(this.interaction);
    }
}
module.exports = commandHandler;