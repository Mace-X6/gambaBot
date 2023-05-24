import { SlashCommand } from "../slashCommand";
class dice extends SlashCommand {
    
        execute() {
            var roll = Math.floor(Math.random() * 6) + 1;
            this.interaction.followUp(`You rolled a ${roll}!`);
        }
    }