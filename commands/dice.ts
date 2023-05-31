import { SlashCommand } from "../slashCommand";
class dice extends SlashCommand {

    execute() {
        const fs = require('fs');
        let user: any = this.userData.filter(user => user.id === this.interaction.user.id)[0];
        let bet: number = this.getAmount(this.interaction.options.getString('bet'), user);
        console.log(bet);
        if (user.balance >= bet) {

            let roll: number = Math.floor(Math.random() * 6) + 1;

            if (roll === 6) {

                user.balance += bet * 5;
                user.xp += 100;
                this.interaction.followUp({ embeds: [this.generateEmbed(bet, true, user.balance, roll)], ephemeral: true })
            
            }
            else {

                user.balance -= bet;
                user.xp += 10;
                this.interaction.followUp({ embeds: [this.generateEmbed(bet, false, user.balance, roll)], ephemeral: true })
                
            }
            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else
        {
            this.interaction.followUp({ content: `You too poor to bet that much!`, ephemeral: true });
        }
    }

    private generateEmbed(bet: number, win: boolean, balance: number, roll: number): object {
        return {
            title: `DICE |  ${win ? 'You won!' : 'You lost!'} rolled: ${roll} `,
            description: `${win ? `You won ${bet * 5} 🤑` : `You lost ${bet} 🤑`}\nYour balance is now ${balance} 🤑`,
            color: win ? 0x00ff00 : 0xff0000,
            timestamp: new Date(),
            author: {
                icon_url: this.interaction.user.avatarURL()
            },
        }
    }

}
module.exports = dice;