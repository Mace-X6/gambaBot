class CommandPipeline {

    private interaction: any;
    private userData: Array<User>;

    constructor(interaction: any) {
        const fs = require('fs');
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));

        if (this.userData.map(user => user.id).includes(this.interaction.user.id) || this.interaction.commandName === 'riseandgrind') {
            if (this.interaction.options.length) {
                if (this.interaction.options.getUser('user')) {
                    if (this.userData.map(user => user.id).includes(this.interaction.options.getUser('user').id)) {

                        this.handleCommand();

                    }
                    else {
                        this.interaction.followUp({ content: `<@${this.interaction.options.getUser('user').id}> hasn't risen and grinded yet!`, ephemeral: true });
                    }
                }
            }
            else {

                this.handleCommand();

            }
        }
        else {
            this.interaction.followUp({ content: `You haven't risen and grinded yet!`, ephemeral: true });
        }
    }
    handleCommand() {
        var command = require(`./commands/${this.interaction.commandName}.js`);
        new command(this.interaction, this.userData);
    }
}
module.exports = CommandPipeline;