import { SlashCommand } from "../slashCommand";
class balance extends SlashCommand {

    execute() {
        if (!this.interaction.options.getUser('user')) {
            let user = this.userData.filter(user => user.id === this.interaction.user.id)[0];
            var balance: number = user.balance;
            this.interaction.followUp({ embeds: [this.generateEmbed(balance, this.interaction.user)], ephemeral: false });
        }
        else {
            let user = this.interaction.options.getUser('user');
            var userId: string = user.id;
            var balance = this.userData.filter(user => user.id === userId)[0].balance;
            this.interaction.followUp({ embeds: [this.generateEmbed(balance, user)], ephemeral: false });
        }
    }

    private generateEmbed(balance: number, user: any): object {
        return {
            title: `${user.username}'s Balance:`,
            description: `${balance} 🤑`,
            color: 0x00ff00,
            timestamp: new Date(),
            footer: {
                text: `Requested by ${this.interaction.user.tag}`,
                icon_url: this.interaction.user.avatarURL()
            },
            thumbnail: {
                url: user.avatarURL()
            },
        }
    }


}

module.exports = balance;