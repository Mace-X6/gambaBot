import { get } from "http";
import { SlashCommand } from "../slashCommand";
class give extends SlashCommand {

    execute() {
        const fs = require('fs');
        let amount: number = this.getAmount(this.interaction.options.getString('amount'), this.interaction.user.id);
        if (amount > 0) {
            var targetUser = this.interaction.options.getUser('user');
            if (this.userData.filter(user => user.id === this.interaction.user.id)[0].balance >= amount) {
                this.userData.filter(user => user.id === this.interaction.user.id)[0].balance -= amount
                this.userData.filter(user => user.id === targetUser.id)[0].balance += amount
                fs.writeFileSync("../userData.json", JSON.stringify(this.userData));
                this.interaction.followUp({ embeds: [this.generateEmbed(amount, this.interaction.user, targetUser)], ephemeral: false  })
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