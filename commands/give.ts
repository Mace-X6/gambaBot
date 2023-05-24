import { SlashCommand } from "../slashCommand";
class give extends SlashCommand {

    execute() {
        const fs = require('fs');
        if (this.interaction.options.getInteger('amount') > 0) {
            var targetUser = this.interaction.options.getUser('user');
            var amount = this.interaction.options.getInteger('amount');
            if (this.userData.filter(user => user.id === this.interaction.user.id)[0].balance >= amount) {
                this.userData.filter(user => user.id === this.interaction.user.id)[0].balance -= amount
                this.userData.filter(user => user.id === targetUser.id)[0].balance += amount
                this.interaction.followUp({ embeds: [this.generateEmbed(amount, this.interaction.user, targetUser)], ephemeral: false  })
                fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
            }
            else {
                this.interaction.followUp({content: `You too poor to give that much!`, ephemeral: true})
            }
        }
        else {
            this.interaction.followUp({ content: `You need to specify a valid amount! (amount > 0)`, ephemeral: true });
        }
    }

    private generateEmbed(amount: number, giver: any, getter: any): object {
        return {
            title: `${giver.username} gave ${amount} 🤑 to ${getter.username}`,
            color: 0x00ff00,
            timestamp: new Date(),
            author: {
                icon_url: giver.avatarURL()
            },
        }
    }
}
module.exports = give;