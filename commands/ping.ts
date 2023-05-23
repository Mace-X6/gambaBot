class ping extends SlashCommand{

    execute() {
        this.interaction.reply('Pong!');
    }
}
module.exports = ping;