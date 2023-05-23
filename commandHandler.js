const fs = require("fs");
class commandHandler {

    constructor(interaction) {
        this.interaction = interaction;
        var userData = JSON.parse(fs.readFileSync("./userData.json"));
        if (userData.map(user => user.id).includes(this.interaction.user.id) || this.interaction.commandName === 'riseandgrind') {
            if (this.interaction.options.length) {
                if (userData.map(user => user.id).includes(this.interaction.options.getUser('user').id)) {

                    this.handleCommand();

                }
                else {
                    this.interaction.reply({ content: `<@${this.interaction.options.getUser('user').id}> hasn't risen and grinded yet!`, ephemeral: true });
                }
            }
            else {

                this.handleCommand();

            }
        }
        else {
            this.interaction.reply({ content: `You haven't risen and grinded yet!`, ephemeral: true });
        }
    }
    handleCommand() {
        var command = require(`./commands/${this.interaction.commandName}.js`);
        new command(this.interaction);
    }
}
module.exports = commandHandler;