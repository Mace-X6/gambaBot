import { SlashCommand } from "../slashCommand";
class xp extends SlashCommand {

    execute() {
        if (!this.interaction.options.getUser('user')) {
            let xp: number = this.userData.filter(user => user.id === this.interaction.user.id)[0].xp;
            this.interaction.followUp({ embeds: [this.generateEmbed(xp, this.interaction.user)], ephemeral: false });
        }
        else {
            let user: any = this.interaction.options.getUser('user');
            let userId: string = user.id;
            let xp: number = this.userData.filter(user => user.id === userId)[0].xp;
            this.interaction.followUp({ embeds: [this.generateEmbed(xp, user)], ephemeral: false });
        }
    }

    private generateEmbed(xp: number, user: any): object {
        return {
            title: `${user.username}'s xp:`,
            description: `${xp} 🤑`,
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
module.exports = xp;