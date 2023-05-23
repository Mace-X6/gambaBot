class ping {
    constructor(interaction) {
        this.interaction = interaction;
        this.execute();
    }

    async execute() {
        await this.interaction.reply('Pong!');
    }
}
module.exports = ping;