class commandHandler {

    constructor(interaction) {
        this.interaction = interaction;
        var userData = JSON.parse(fs.readFileSync("./userData.json"));
        if (userData.includes(user => user.id === this.interaction.user.id)) {
            if (userData.includes(user => user.id === this.interaction.options.filter(option => { return option.name === 'user' })[0].user.id)) {
                this.handleCommand();
            }
            else {
                this.interaction.reply({ content: `<@${this.interaction.options.filter(option => { return option.name === 'user' })[0].user.id}> hasn't risen and grinded yet!`, ephemeral: true });
            }
        }
        else {
            this.interaction.reply({content: `You haven't risen and grinded yet!`, ephemeral: true});
        }
    }
    handleCommand() {
        var command = require(`./commands/${this.interaction.commandName}.js`);
        new command(this.interaction);
    }
}
module.exports = commandHandler;