import { SlashCommand } from "../slashCommand";
class ping extends SlashCommand{

    execute() {
        this.interaction.followUp('Pong!');
    }
}
module.exports = ping;