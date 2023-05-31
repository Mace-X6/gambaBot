import { SlashCommand } from "../slashCommand";
class coinflip extends SlashCommand {

    execute() {
        const fs = require('fs');
        let user: any = this.userData.filter(user => user.id === this.interaction.user.id)[0];
        let bet: number = this.getAmount(this.interaction.options.getString('bet'), user);
        let sideBetOn: number = this.interaction.options.getString('side') === ('heads' || 'h') && this.interaction.options.getString('side') != ('tails' || 't') ? 0 : 1;

        if (user.balance >= bet) {
            let flip: number = Math.floor(Math.random() * 2);
            if (flip === sideBetOn) {
                user.balance += bet * 2;
                user.xp += 100;
                this.interaction.followUp({ embeds: [this.generateEmbed(bet, true, user.balance, flip)], empherial: false })
            }
            else {
                user.balance -= bet;
                user.xp += 10;
                this.interaction.followUp({ embeds: [this.generateEmbed(bet, false, user.balance, flip)], empherial: false })
            }
            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            this.interaction.followUp({ content: `You too poor to bet that much!`, ephemeral: true });
        }
    }

    private generateEmbed(bet: number, win: boolean, balance: number, flip: number): object {
        return {
            title: `COINFLIP |  ${win ? 'You won!' : 'You lost!'}, landed on: ${flip === 0 ? 'heads' : 'tails'} `,
            description: `${win ? `You won ${bet * 2} 🤑` : `You lost ${bet} 🤑`}\nYour balance is now ${balance} 🤑`,
            color: win ? 0x00ff00 : 0xff0000,
            timestamp: new Date(),
            author: {
                icon_url: this.interaction.user.avatarURL()
            },
        }
    }

}
module.exports = coinflip;